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
			api.get('/auth/refreshToken')
				.then((res) => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					const token = res.data.accessToken;
					api.interceptors.request.clear();
					api.interceptors.request.use(
						(req) => {
							if (token) {
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								req.headers['x-access-token'] = token;
							}
							return req;
						},
						(error) => {
							console.error(error);
						},
					);

					// TODO: enable it when the backend sends reason for 403 to avoid looping
					// if (err.config) {
					// await api.request(err.config);
					// }
					return res;
				})
				.catch((error) => {
					console.error('error', error);
				});
		}
	},
);

export default api;
