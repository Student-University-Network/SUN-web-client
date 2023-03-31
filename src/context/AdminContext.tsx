import { createContext, useContext, useState } from 'react';
import adminService from 'src/api/adminService';
import { EmptyFunction } from 'src/Components/Utils';

export interface NewUserType {
	firstName: string;
	lastName: string;
	email: string;
	username?: string;
	password?: string;
	role: string;
	programId?: string;
	programName?: string;
}

export interface UserListItem {
	id: string;
	role: string;
	username: string;
	firstName: string;
	lastName: string;
}

type AdminContextType = {
	usersList: Array<UserListItem>;
	createBatchUsers: (
		newUsersList: Array<NewUserType>,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	getUsersList: (
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
};

const AdminContext = createContext<AdminContextType>({
	usersList: [],
	createBatchUsers: () => {},
	getUsersList: () => {},
});

type Props = {
	children: React.ReactNode;
};

export function AdminProvider({ children }: Props) {
	const [usersList, setUsersList] = useState<Array<UserListItem>>([]);

	function getUsersList(
		done: (data: any) => void,
		error: (data: any) => void,
	) {
		adminService
			.getUserslist()
			.then((res) => {
				setUsersList(res.data.data.users);
				done(null);
			})
			.catch((err) => error(null));
	}

	function createBatchUsers(
		newUsersList: Array<NewUserType>,
		done: (data: any) => void,
		error: (data: any) => void,
	) {
		adminService
			.createBatchUsers({ users: newUsersList })
			.then((res) => {
				getUsersList(EmptyFunction, EmptyFunction);
				done(res.data);
			})
			.catch((err) => error(null));
	}

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = {
		usersList,
		createBatchUsers,
		getUsersList,
	};

	return (
		<AdminContext.Provider value={value}>{children}</AdminContext.Provider>
	);
}

export function useAdmin() {
	return useContext(AdminContext);
}
