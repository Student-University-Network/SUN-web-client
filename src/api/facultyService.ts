/* eslint-disable class-methods-use-this */
import { CourseItem } from 'src/context/FacultyContext';
import http from '.';

interface CoursesListResponse {
	status: string;
	data: {
		courses: Array<CourseItem>;
	};
}

interface GetFacultyAttendanceResponse {
	status: string;
	data: FacultyAttendanceReport;
}

export interface FacultyAttendanceReport {
	courseId: string;
	courseName: string;
	professorId: string;
	professorName: string;
	totalLectures: number;
	attendance: Array<{
		userId: string;
		firstName: string;
		lastName: string;
		attended: number;
	}>;
}

class FacultyService {
	getCoursesList() {
		return http.get<CoursesListResponse>('/faculty/courses-list');
	}

	setLectureStatus(payload: any) {
		return http.post('timetable/lecture-status', payload);
	}

	getFacultyAttendanceReport(courseId: string, batchId: string) {
		return http.get<GetFacultyAttendanceResponse>(
			`attendance/report?courseId=${courseId}&batchId=${batchId}`,
		);
	}
}

export default new FacultyService();
