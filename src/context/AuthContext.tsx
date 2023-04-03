import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import authService from 'src/api/authService';

type User = {
	userId: string;
	firstName: string;
	lastName: string;
	username: string;
	role: string;
	programId: string;
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
				setUser({
					userId: res.data.id,
					username: res.data.username,
					firstName: res.data.firstName,
					lastName: res.data.lastName,
					role: res.data.role,
					programId: res.data.programId,
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
				const { data } = res.data;
				authService.setToken(data.accessToken);
				setUser({
					userId: data.id,
					username: data.username,
					firstName: data.firstName,
					lastName: data.lastName,
					role: data.role,
					programId: data.programId,
				});
				done();
			})
			.catch((err: any) => {
				error();
			});
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
