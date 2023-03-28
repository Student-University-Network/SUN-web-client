import { createContext, useContext, useState } from 'react';
import programService from 'src/api/programService';

export interface ProgramListItem {
	programId: string;
	programName: string;
	duration: number;
	startYear: string;
	endYear: string;
	tag: string;
	currentSemester: number;
}

export interface Course {
	courseId: string;
	courseName: string;
	totalLectures: number;
	compulsory: boolean;
}

export interface Semester {
	semesterId: string;
	semesterName: string;
	order: number;
	courses: Array<Course>;
}

export interface Batch {
	id: string;
	batchName: string;
}

export interface Program {
	programId: string;
	programName: string;
	duration: number;
	startYear: string;
	endYear: string;
	tag: string;
	batches: Array<Batch>;
	currentSemester: number;
	semesters: Array<Semester>;
}

type ProgramContextType = {
	program: Program;
	programsList: Array<ProgramListItem>;
	getProgramDetails: (
		programId: string,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	getProgramsList: (
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	createProgram: (
		payload: any,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
	updateProgram: (
		programId: string,
		payload: any,
		done: (data: any) => void,
		error: (data: any) => void,
	) => void;
};

const ProgramContext = createContext<ProgramContextType>({
	program: {
		programId: '',
		programName: '',
		duration: 0,
		startYear: '',
		endYear: '',
		tag: '',
		currentSemester: 0,
		semesters: [],
		batches: [],
	},
	programsList: [],
	getProgramDetails: () => {},
	getProgramsList: () => {},
	createProgram: () => {},
	updateProgram: () => {},
});

type Props = {
	children: React.ReactNode;
};

export function ProgramProvider({ children }: Props) {
	const [program, setProgram] = useState<Program>({
		programId: '',
		programName: '',
		duration: 0,
		startYear: '',
		endYear: '',
		tag: '',
		currentSemester: 0,
		semesters: [],
		batches: [],
	});
	const [programsList, setProgramsList] = useState<Array<ProgramListItem>>(
		[],
	);

	// const { user } = useAuth();

	function getProgramDetails(
		programId: string,
		done: (data: any) => void,
		error: (data: any) => void,
	) {}

	function getProgramsList(
		done: (data: any) => void,
		error: (data: any) => void,
	) {
		programService
			.getProgramsList()
			.then((res) => {
				const { data } = res.data;
				setProgramsList(data);
				done(null);
			})
			.catch((err) => error(null));
	}

	function createProgram(
		payload: any,
		done: (data: any) => void,
		error: (data: any) => void,
	) {
		console.log('eifubeafjb');
		programService
			.createProgram(payload)
			.then((res) => {
				const { data } = res.data;
				setProgramsList([...programsList, data]);
				done(null);
			})
			.catch((err) => error(null));
	}

	function updateProgram(
		programId: string,
		payload: any,
		done: (data: any) => void,
		error: (data: any) => void,
	) {}

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = {
		program,
		programsList,
		getProgramsList,
		getProgramDetails,
		createProgram,
		updateProgram,
	};

	return (
		<ProgramContext.Provider value={value}>
			{children}
		</ProgramContext.Provider>
	);
}

export function useProgram() {
	return useContext(ProgramContext);
}
