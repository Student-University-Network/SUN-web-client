/* eslint-disable class-methods-use-this */
import http from '.';

interface UserDetailsResponse {
	status: string;
	data: {
		userId: string;
		firstName: string;
		middleName: string | null;
		lastName: string;
		gender: string;
		dateOfBirth: string | null;
	};
}

export interface UserDetailsUpdateInput {
	firstName: string;
	middleName: string;
	lastName: string;
	gender: string;
	dateOfBirth: Date | null;
}

class UserService {
	userDetails() {
		return http.get<UserDetailsResponse>('/user/profile');
	}

	// TODO (UserService) : add PUT body
	updateUserDetails(newUserDetails: any) {
		return http.put<UserDetailsResponse>('/user/profile', newUserDetails);
	}

	// TODO (UserService) : add PUT body
	changePassword() {
		return http.put('/user/password');
	}
}

export default new UserService();
