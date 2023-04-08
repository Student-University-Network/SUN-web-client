import { AxiosError } from 'axios';
import { createContext, useContext, useState } from 'react';
import adminService, { AssignProfessorInput } from 'src/api/adminService';
import { EmptyFunction } from 'src/Components/Utils';
import { FullBatch } from 'src/Components/EditBatchDetails';
import { Timetable } from 'src/pages/timetable/manage';
import { useAuth } from './AuthContext';

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
		programName: string | null;
		batchName: string | null;
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
	assignProfessors: (
		payload: AssignProfessorInput,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	getBatchDetails: (
		batchId: string,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	saveBatchDetails: (
		batchId: FullBatch,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	setTimetable: (
		payload: Timetable,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	getTimetable: (
		batchId: string,
		done: (data: Timetable) => void,
		error: (data: any) => void,
	) => void;
};

const AdminContext = createContext<AdminContextType>({
	usersList: [],
	createBatchUsers: () => {},
	getUsersList: () => {},
	getOtherUserDetails: () => {},
	assignProfessors: () => {},
	getBatchDetails: () => {},
	saveBatchDetails: () => {},
	setTimetable: () => {},
	getTimetable: () => {},
});

type Props = {
	children: React.ReactNode;
};

export function AdminProvider({ children }: Props) {
	const { user } = useAuth();
	const [usersList, setUsersList] = useState<Array<UserListItem>>([]);

	function getUsersList(
		done: (data: any) => void,
		error: (data: any) => void,
	) {
		if (user?.role !== 'ADMIN') return;
		adminService
			.getUserslist()
			.then((res) => {
				console.log(res.data);
				setUsersList(res.data.data.users);
				done(null);
			})
			.catch((err) => {
				error(null);
				console.log(err);
			});
	}

	function createBatchUsers(
		newUsersList: Array<NewUserType>,
		done: (data: any) => void,
		error: (data: any) => void,
	) {
		if (user?.role !== 'ADMIN') return;
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
		if (user?.role !== 'ADMIN') return;
		adminService
			.getOtherUserDetail(userId)
			.then((res) => done(res.data.data))
			.catch((err: AxiosError) => error(err.message));
	}

	function assignProfessors(
		payload: AssignProfessorInput,
		done: (data: any) => void,
		error: (data: any) => void,
	) {
		if (user?.role !== 'ADMIN') return;
		adminService
			.assignProfessor(payload)
			.then((res) => done(payload))
			.catch((err) => error(null));
	}

	function getBatchDetails(
		batchId: string,
		done: (data: any) => void,
		error: (data: any) => void,
	) {
		if (user?.role !== 'ADMIN') return;
		adminService
			.getBatchDetails(batchId)
			.then((res) => done(res.data.data))
			.catch((err) => error(null));
	}

	function saveBatchDetails(
		payload: FullBatch,
		done: (data: any) => void,
		error: (data: any) => void,
	) {
		if (user?.role !== 'ADMIN') return;
		adminService
			.saveBatchDetails(payload)
			.then((res) => done(null))
			.catch((err) => error(null));
	}

	function setTimetable(
		payload: Timetable,
		done: (data: any) => void,
		error: (data: any) => void,
	) {
		if (user?.role !== 'ADMIN') return;
		adminService.setTimetable(payload).then(
			(res) => done(null),
			(err) => error(null),
		);
	}

	function getTimetable(
		batchId: string,
		done: (data: Timetable) => void,
		error: (data: any) => void,
	) {
		if (user?.role === 'FACULTY') {
			adminService
				.getFacultyTimetable()
				.then((res) => done(res.data.data))
				.catch((err) => error(null));
		} else {
			adminService
				.getTimetable(batchId)
				.then((res) => done(res.data.data))
				.catch((err) => error(null));
		}
	}

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = {
		usersList,
		createBatchUsers,
		getUsersList,
		getOtherUserDetails,
		assignProfessors,
		getBatchDetails,
		saveBatchDetails,
		setTimetable,
		getTimetable,
	};

	return (
		<AdminContext.Provider value={value}>{children}</AdminContext.Provider>
	);
}

export function useAdmin() {
	return useContext(AdminContext);
}
