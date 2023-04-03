/* eslint-disable class-methods-use-this */
import http from '.';

interface RegisterInput {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

interface LoginInput {
	username: string;
	password: string;
}

interface LoginResponse {
	status: string;
	message: string;
	data: {
		accessToken: string;
		firstName: string;
		lastName: string;
		username: string;
		id: string;
		role: string;
		programId: string;
	};
}

interface RefreshResponse {
	accessToken: string;
	firstName: string;
	lastName: string;
	username: string;
	id: string;
	role: string;
	programId: string;
}

class AuthService {
	private accessTokenInterceptor: number | null = null;

	register(newUser: RegisterInput) {
		return http.post('/auth/register', newUser);
	}

	login(usercreds: LoginInput) {
		return http.post<LoginResponse>('/auth/login', usercreds);
	}

	test() {
		return http.get('/auth/test');
	}

	refresh() {
		return http.get<RefreshResponse>('/auth/refreshToken');
	}

	setToken(token: string) {
		if (this.accessTokenInterceptor) {
			http.interceptors.request.eject(this.accessTokenInterceptor);
			this.accessTokenInterceptor = null;
		}
		this.accessTokenInterceptor = http.interceptors.request.use(
			(req) => {
				if (token) {
					req.headers['x-access-token'] = token;
					req.headers.Authorization = `Bearer ${token}`;
				}
				return req;
			},
			(err) => {
				throw err;
			},
		);
	}

	logout() {
		if (this.accessTokenInterceptor) {
			http.interceptors.request.eject(this.accessTokenInterceptor);
			this.accessTokenInterceptor = null;
		}
		return http.post('/auth/logout');
	}
}

export default new AuthService();
