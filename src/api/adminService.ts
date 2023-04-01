/* eslint-disable class-methods-use-this */
import {
	NewUserType,
	UserDetailType,
	UserListItem,
} from 'src/context/AdminContext';
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
}

export default new AdminService();
