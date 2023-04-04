import { createContext, useContext, useEffect, useState } from 'react';
import facultyService from 'src/api/facultyService';
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
}

type FacultyContextType = {
	coursesList: Array<CourseItem>;
	getCoursesList: (
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
};

const FacultyContext = createContext<FacultyContextType>({
	coursesList: [],
	getCoursesList: () => {},
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

	useEffect(() => {
		if (user) {
			getCoursesList();
		}
	}, [user]);

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = {
		coursesList,
		getCoursesList,
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
