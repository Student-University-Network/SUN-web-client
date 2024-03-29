/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/destructuring-assignment */
import Sidebar from 'src/partials/Sidebar';
import Navbar from 'src/partials/Navbar';
import Head from 'next/head';
import Container from 'src/partials/Container';
import {
	AcademicCapIcon,
	BookOpenIcon,
	ClockIcon,
	LightBulbIcon,
	UsersIcon,
} from '@heroicons/react/24/outline';
import { CourseItem, useFaculty } from 'src/context/FacultyContext';
import { useProgram } from 'src/context/ProgramContext';
import { useAuth } from 'src/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface CourseCardProps {
	data: CourseItem;
	// eslint-disable-next-line react/require-default-props
	onCardClick?: (courseId: string, batchId: string) => void;
}

export function CourseCard({ data, onCardClick = () => {} }: CourseCardProps) {
	return (
		<div
			className="shadow cursor-pointer hover:shadow-lg w-full mx- p-6 rounded my-1"
			key={data.courseId}
			role="button"
			onClick={() => onCardClick(data.courseId, data.batchId)}
		>
			<div className="text-xl pb-2 font-semibold">{data.courseName}</div>
			<div className="mt-2 flex items-center space-x-2">
				<AcademicCapIcon className="w-5 h-5" />
				<span>{data.programName}</span>
			</div>
			<div className="mt-2 flex items-center space-x-2">
				<UsersIcon className="w-5 h-5" />
				<span>{data.batchName}</span>
			</div>
			<div className="mt-2 flex items-center space-x-2">
				<BookOpenIcon className="w-5 h-5" />
				<span>{data.semesterName} Lectures</span>
			</div>
			<div className="mt-2 flex items-center space-x-2">
				<ClockIcon className="w-5 h-5" />
				<span>{data.totalLectures} Lectures</span>
			</div>
		</div>
	);
}

export default function Courses() {
	const router = useRouter();
	const { coursesList } = useFaculty();
	const { program } = useProgram();
	const { user } = useAuth();

	useEffect(() => {
		if (user?.userId !== '' && user?.role === 'ADMIN') {
			router.replace('/dashboard');
		}
	}, [user]);

	return (
		<>
			<Head>
				<title>Courses</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/courses.svg" />
			</Head>
			<Navbar />
			<Sidebar />
			<Container>
				<div className="ml-1 sm:ml-3 pb-4 px-4 sm:px-6 h-full">
					<span className="inline-flex items-center text-2xl font-medium text-primary-800 dark:text-primary-500">
						<LightBulbIcon className="w-8 h-8 my-5 mr-2 " />
						Courses
					</span>
					<div className="flex flex-col w-full items-center space-y-2">
						{user?.role === 'FACULTY'
							? coursesList.map((crs, crsIndex) => (
									<CourseCard data={crs} />
							  ))
							: program.semesters[
									program.currentSemester
							  ]?.courses.map((crs, crsIndex) => (
									<CourseCard
										key={crs.courseId}
										data={{
											...crs,
											programId: program.programId,
											programName: program.programName,
											semesterId:
												program.semesters[
													program.currentSemester
												]?.semesterId,
											semesterName:
												program.semesters[
													program.currentSemester
												]?.semesterName,
											batchId: '',
											batchName: '',
										}}
									/>
							  ))}
					</div>
				</div>
			</Container>
		</>
	);
}
