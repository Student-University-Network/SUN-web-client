import {
	PlusCircleIcon,
	TrashIcon,
	PlusIcon,
	CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, IconButton } from 'src/Components/Button';
import InputField from 'src/Components/InputField';
import ResourceSelector, {
	defaultState,
	ResourceSelectorStateType,
} from 'src/Components/ResourceSelector';
import {
	THead,
	THeaderRowCell,
	THeadCell,
	TBody,
	TRow,
	TDataCell,
	TimeTableCell,
	TimeTableEmptyCell,
} from 'src/Components/TableComponents';
import { useAuth } from 'src/context/AuthContext';
import { ProgramListItem } from 'src/context/ProgramContext';
import { useUser } from 'src/context/UserContext';
import Container from 'src/partials/Container';
import Navbar from 'src/partials/Navbar';
import Sidebar from 'src/partials/Sidebar';

interface Timetable {
	batchId: string;
	batchName: string;
	days: Array<Day>;
}

interface Day {
	date: Date;
	day: string;
	lectures: Array<Lecture>;
}

interface Lecture {
	courseId: string;
	courseName: string;
	professorId: string;
	professorName: string;
	//   startTime: DateTime,
	//   endTime: DateTime
}

export default function ManageTimetable() {
	const { userId } = useUser();
	const { user } = useAuth();
	const [resourcePicker, setResourcePicker] =
		useState<ResourceSelectorStateType>(defaultState());
	useEffect(() => {
		if (
			userId !== '' &&
			['STUDENT', 'FACULTY', 'STAFF'].includes(user?.role || '')
		) {
			router.replace('/dashboard');
		}
	}, [userId]);
	return (
		<>
			<Head>
				<title>Manage TimeTable</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/timetable.svg" />
			</Head>
			<Navbar />
			<Sidebar />

			{resourcePicker.show ? (
				<ResourceSelector<(typeof resourcePicker.data)[0]>
					closePrompt={() => setResourcePicker(defaultState())}
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					savePrompt={(v: any) => resourcePicker.savePrompt(v)}
					data={resourcePicker.data}
					columns={resourcePicker.column}
					label={resourcePicker.label}
				/>
			) : null}

			<Container>
				<section className="ml-3 h-full">
					<form className="flex flex-col justify-center px-3 overflow-hidden">
						<span className="inline-flex items-center text-2xl font-medium text-primary-800 dark:text-primary-500">
							<CalendarDaysIcon className="m-8 h-8 mr-2" />
							Manage Timetable
						</span>
						<div className="px-4 py-5 sm:p-6 grid grid-cols-6 gap-6">
							<div className="flex justify-between items-center py-2 space-x-2 col-span-6">
								<InputField
									className="col-span-6 sm:col-span-3 p-1"
									label="Select from CSV file"
									type="file"
									accept=".csv"
									onChange={(e) => {}}
								/>
								<div className="flex space-x-2">
									<Button label="Create" onClick={() => {}} />
									<Button
										className="btn-outline"
										label="Reset"
										onClick={() => {}}
									/>
								</div>
							</div>
							<table className="w-full col-span-6">
								<THead className="font-bold text-xl py-6">
									<THeaderRowCell className="border-2">
										<TDataCell className="ttcell-style" />
										<THeadCell className="text-center border-2 dark:border-gray-600">
											9:00 - 10:00
										</THeadCell>
										<THeadCell className="text-center border-2 dark:border-gray-600">
											10:00 - 11:00
										</THeadCell>
										<THeadCell className="text-center border-2 dark:border-gray-600">
											11:00 - 12:00
										</THeadCell>
										<THeadCell className="text-center border-2 dark:border-gray-600">
											12:00 - 1:00
										</THeadCell>
										<THeadCell className="text-center border-2 dark:border-gray-600">
											1:00 - 2:00
										</THeadCell>
										<THeadCell className="text-center border-2 dark:border-gray-600">
											2:00 - 3:00
										</THeadCell>
										<THeadCell className="text-center border-2 dark:border-gray-600">
											2:00 - 3:00
										</THeadCell>
									</THeaderRowCell>
								</THead>
								<TBody>
									<TRow>
										<THeadCell className="ttcell-style">
											Monday
										</THeadCell>
										{/* <TDataCell className="text-center border-2  dark:border-gray-600 ">
											DSA{' '}
											<p className="italic">
												Prof. Yash Sawant
											</p>
										</TDataCell> */}
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
									</TRow>
									<TRow>
										<THeadCell className="ttcell-style">
											Tuesday
										</THeadCell>
										{/* <TDataCell className="text-center border-2  dark:border-gray-600 ">
											DSA{' '}
											<p className="italic">
												Prof. Yash Sawant
											</p>
										</TDataCell> */}
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
									</TRow>
									<TRow>
										<THeadCell className="ttcell-style">
											Wednesday
										</THeadCell>
										{/* <TDataCell className="text-center border-2  dark:border-gray-600 ">
											DSA{' '}
											<p className="italic">
												Prof. Yash Sawant
											</p>
										</TDataCell> */}
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
									</TRow>
									<TRow>
										<THeadCell className="ttcell-style">
											Thursday
										</THeadCell>
										{/* <TDataCell className="text-center border-2  dark:border-gray-600 ">
											DSA{' '}
											<p className="italic">
												Prof. Yash Sawant
											</p>
										</TDataCell> */}
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
									</TRow>
									<TRow>
										<THeadCell className="ttcell-style">
											Friday
										</THeadCell>
										{/* <TDataCell className="text-center border-2  dark:border-gray-600 ">
											DSA{' '}
											<p className="italic">
												Prof. Yash Sawant
											</p>
										</TDataCell> */}
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
										<TimeTableCell
											subjectName="DSA"
											profName="Prof. Yash Sawant"
										/>
									</TRow>
									<TRow>
										<THeadCell className="ttcell-style">
											Saturday
										</THeadCell>
										<TimeTableEmptyCell />
										{/* to pass length of colspan we can get the length of lectures in future */}
									</TRow>
								</TBody>
							</table>
						</div>
					</form>
				</section>
			</Container>
		</>
	);
}
