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

export interface GetStudentAttendanceResponse {
	status: string;
	data: StudentAttendanceReport;
}

export interface StudentAttendanceReport {
	courses: Array<{
		courseId: string;
		courseName: string;
		compulsory: boolean;
		totalLectures: number;
		attended: number;
	}>;
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

	getStudentAttendanceReport() {
		return http.get<GetStudentAttendanceResponse>(
			'attendance/report?courseId=&batchId=',
		);
	}
}

export default new UserService();
