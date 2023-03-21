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

export interface ChangePasswordInput {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export interface ChangePasswordResponse {
	code: string;
	message: string;
	[k: string]: any;
}

class UserService {
	userDetails() {
		return http.get<UserDetailsResponse>('/user/profile');
	}

	updateUserDetails(newUserDetails: any) {
		return http.put<UserDetailsResponse>('/user/profile', newUserDetails);
	}

	changePassword(payload: ChangePasswordInput) {
		return http.put<[ChangePasswordResponse]>('/user/password', payload);
	}
}

export default new UserService();
