import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import authService from 'src/api/authService';

type User = {
	username: string;
};

type AuthContextType = {
	user: User | null;
	dataloaded: boolean;
	login: (
		username: string,
		password: string,
		done: () => void,
		error: () => void,
	) => void;
	logout: () => void;
};

const authContextDefaultValues: AuthContextType = {
	user: null,
	dataloaded: false,
	login: () => {},
	logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(
	authContextDefaultValues,
);

type Props = {
	children: React.ReactNode;
};
export function AuthProvider({ children }: Props) {
	const [user, setUser] = useState<User | null>(null);
	const [dataloaded, setDataloaded] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		authService
			.refresh()
			.then((res) => {
				authService.setToken(res.data.accessToken);
				// TODO: when refresh response has username then set it here
				setUser({
					username: 'tempuser',
				});
				if (router.pathname === '/login' || router.pathname === '') {
					router.replace('/dashboard');
				}
				router.replace(router.pathname);
				setDataloaded(true);
			})
			.catch((err) => {
				router.push('/login');
				setDataloaded(true);
			});
	}, []);

	const login = (
		username: string,
		password: string,
		done: () => void,
		error: () => void,
	) => {
		authService
			.login({
				username,
				password,
			})
			.then((res) => {
				authService.setToken(res.data.accessToken);
				setUser({
					username: res.data.username,
				});
				done();
			})
			.catch((err: any) => {
				error();
			});
		// setUser({ username: 'Manas' });
	};

	const logout = () => {
		authService
			.logout()
			.then((res) => {
				setUser(null);
				router.push('/');
				router.reload();
			})
			.catch((err: any) => {
				console.error('Server Error');
			});
	};

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = {
		user,
		dataloaded,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
