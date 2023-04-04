/* eslint-disable class-methods-use-this */
import { CourseItem } from 'src/context/FacultyContext';
import http from '.';

interface CoursesListResponse {
	status: string;
	data: {
		courses: Array<CourseItem>;
	};
}

class FacultyService {
	getCoursesList() {
		return http.get<CoursesListResponse>('/faculty/courses-list');
	}
}

export default new FacultyService();
