/* eslint-disable class-methods-use-this */
import {
	NewUserType,
	UserDetailType,
	UserListItem,
} from 'src/context/AdminContext';
import { FullBatch } from 'src/Components/EditBatchDetails';
import { Timetable } from 'src/pages/timetable/manage';
import http from '.';

interface CreateBatchUsersInput {
	users: Array<NewUserType>;
}

interface UsersListResponse {
	status: string;
	data: {
		users: Array<UserListItem>;
	};
}

interface GetUserDetailsResponse {
	status: string;
	data: UserDetailType;
}

export interface AssignProfessorInput {
	courseId: string;
	teacherId: string;
	batchId: string;
}

export interface GetBatchDetailsResponse {
	status: string;
	data: FullBatch;
}

export interface GetTimetableResponse {
	status: string;
	data: Timetable;
}

class AdminService {
	getUserslist() {
		return http.get<UsersListResponse>('/admin/user-list');
	}

	createBatchUsers(payload: CreateBatchUsersInput) {
		return http.post('/auth/register-batch', payload);
	}

	getOtherUserDetail(userId: string) {
		return http.get<GetUserDetailsResponse>(`/admin/user/${userId}`);
	}

	assignProfessor(payload: AssignProfessorInput) {
		return http.post('/admin/assign-professor', payload);
	}

	getBatchDetails(batchId: string) {
		return http.get<GetBatchDetailsResponse>(`/admin/batch/${batchId}`);
	}

	saveBatchDetails(payload: FullBatch) {
		return http.post('/admin/batch', payload);
	}

	setTimetable(payload: Timetable) {
		return http.post('/timetable/new', payload);
	}

	getTimetable(batchId: string) {
		return http.get<GetTimetableResponse>(`/timetable/${batchId}`);
	}
}

export default new AdminService();
