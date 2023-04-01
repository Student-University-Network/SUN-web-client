import { AxiosError } from 'axios';
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

export interface UserDetailType {
	id: string;
	role: string;
	profile: {
		id: string;
		gender: string;
		firstName: string;
		middleName?: string;
		lastName: string;
		dateOfBirth: Date | null;
	};
	academicDetails?: {
		rollNo: number | null;
		batchId: string | null;
		programId: string | null;
	};
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
	getOtherUserDetails: (
		userId: string,
		done: (data: UserDetailType) => void,
		error: (data: string) => void,
	) => void;
};

const AdminContext = createContext<AdminContextType>({
	usersList: [],
	createBatchUsers: () => {},
	getUsersList: () => {},
	getOtherUserDetails: () => {},
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

	function getOtherUserDetails(
		userId: string,
		done: (data: UserDetailType) => void,
		error: (data: string) => void,
	) {
		adminService
			.getOtherUserDetail(userId)
			.then((res) => done(res.data.data))
			.catch((err: AxiosError) => error(err.message));
	}

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = {
		usersList,
		createBatchUsers,
		getUsersList,
		getOtherUserDetails,
	};

	return (
		<AdminContext.Provider value={value}>{children}</AdminContext.Provider>
	);
}

export function useAdmin() {
	return useContext(AdminContext);
}
