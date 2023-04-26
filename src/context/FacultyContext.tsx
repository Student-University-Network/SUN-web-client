import { createContext, useContext, useEffect, useState } from 'react';
import facultyService, {
	FacultyAttendanceReport,
} from 'src/api/facultyService';
import { LectureStatus } from 'src/pages/timetable/manage';
import { useAuth } from './AuthContext';

export interface CourseItem {
	courseId: string;
	courseName: string;
	totalLectures: number;
	compulsory: boolean;
	semesterId: string;
	semesterName: string;
	programId: string;
	programName: string;
	batchId: string;
	batchName: string;
}

type FacultyContextType = {
	coursesList: Array<CourseItem>;
	getCoursesList: (
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	setLectureStatus: (
		batchId: string,
		lectureId: string,
		status: LectureStatus,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	getFacultyAttendanceReport: (
		courseId: string,
		batchId: string,
		done: (data: FacultyAttendanceReport) => void,
		error: (data: any) => void,
	) => void;
};

const FacultyContext = createContext<FacultyContextType>({
	coursesList: [],
	getCoursesList: () => {},
	setLectureStatus: () => {},
	getFacultyAttendanceReport: () => {},
});

type Props = {
	children: React.ReactNode;
};

export function FacultyProvider({ children }: Props) {
	const [coursesList, setCoursesList] = useState<Array<CourseItem>>([]);

	const { user } = useAuth();

	const getCoursesList = (
		done = (data: any) => {},
		error = (data: any) => {},
	) => {
		if (user?.role !== 'FACULTY') return;
		facultyService
			.getCoursesList()
			.then((res) => {
				const { data } = res.data;
				setCoursesList(data.courses);
				done(null);
			})
			.catch((err) => {
				error(null);
			});
	};

	const setLectureStatus = (
		batchId: string,
		lectureId: string,
		status: LectureStatus,
		done: (data: any) => void,
		error: (data: any) => void,
	) => {
		if (user?.role !== 'FACULTY') return;
		facultyService
			.setLectureStatus({ batchId, lectureId, status })
			.then((res) => done(null))
			.catch((err) => error(null));
	};

	const getFacultyAttendanceReport = (
		courseId: string,
		batchId: string,
		done: (data: FacultyAttendanceReport) => void,
		error: (data: any) => void,
	) => {
		if (user?.role !== 'FACULTY') return;
		facultyService
			.getFacultyAttendanceReport(courseId, batchId)
			.then((res) => done(res.data.data))
			.catch((err) => error(null));
	};

	useEffect(() => {
		if (user) {
			getCoursesList();
		}
	}, [user]);

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = {
		coursesList,
		getCoursesList,
		setLectureStatus,
		getFacultyAttendanceReport,
	};

	return (
		<FacultyContext.Provider value={value}>
			{children}
		</FacultyContext.Provider>
	);
}

export function useFaculty() {
	return useContext(FacultyContext);
}
