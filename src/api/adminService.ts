/* eslint-disable class-methods-use-this */
import { NewUserType, UserListItem } from 'src/context/AdminContext';
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

class AdminService {
	getUserslist() {
		return http.get<UsersListResponse>('/admin/user-list');
	}

	createBatchUsers(payload: CreateBatchUsersInput) {
		return http.post('/auth/register-batch', payload);
	}
}

export default new AdminService();
