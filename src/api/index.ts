/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosError, AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
	baseURL: 'http://localhost:5001/api',
	withCredentials: true,
	headers: {
		'Content-type': 'application/json',
	},
});

api.interceptors.response.use(
	(res) => res,
	(err: AxiosError) => {
		if (err.response?.status === 403) {
			return api
				.get('/auth/refreshToken')
				.then((res) => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					const token = res.data.accessToken;
					api.interceptors.request.clear();
					api.interceptors.request.use(
						(req) => {
							if (token) {
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								req.headers['x-access-token'] = token;
								// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
								req.headers.Authorization = `Bearer ${token}`;
							}
							return req;
						},
						(error) => {
							console.error(error);
						},
					);

					if (err.response?.status === 403 && err.config) {
						return api.request(err.config);
					}
					return res;
				})
				.catch((error: AxiosError) => error);
		}
		if (
			err.response?.status === 401 &&
			window.location.pathname !== '/login' &&
			localStorage.getItem('loggedIn') === 'true'
		) {
			// eslint-disable-next-line no-alert
			alert(
				'Your sessions has expired !!. Please refresh and login back',
			);
		}
		return Promise.reject(err);
	},
);

export default api;
