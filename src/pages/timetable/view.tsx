/* eslint-disable no-nested-ternary */
import {
	ArrowPathIcon,
	CalendarDaysIcon,
	ClockIcon,
	HomeIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAdmin } from 'src/context/AdminContext';
import { useAuth } from 'src/context/AuthContext';
import { useProgram } from 'src/context/ProgramContext';
import Container from 'src/partials/Container';
import Navbar from 'src/partials/Navbar';
import Sidebar from 'src/partials/Sidebar';
import { ERROR, INFO, useAlert } from 'src/Components/Alert';
import { useFaculty } from 'src/context/FacultyContext';
import { IconButton } from 'src/Components/Button';
import { LectureStatus, Timetable, WeekDay, lectureTimeLabel } from './manage';

export default function ViewTimeTable() {
	const { user } = useAuth();
	const { showAlert } = useAlert();
	const { program } = useProgram();
	const { getTimetable } = useAdmin();
	const { setLectureStatus } = useFaculty();
	const [timetableData, setTimetableData] = useState<Timetable>({
		batchId: '',
		batchName: '',
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		days: [...Array(7)].map((_, i) => ({ weekDay: i, lectures: [] })),
	});

	function fetchTimetable() {
		getTimetable(
			program.batchId,
			(data: Timetable) => setTimetableData(data),
			() => showAlert(ERROR, 'Failed to fetch timetable', false),
		);
	}

	function lectureStatusChange(
		batchId: string,
		lectureId: string,
		newStatus: LectureStatus,
	) {
		setLectureStatus(
			batchId,
			lectureId,
			newStatus,
			() => {
				showAlert(INFO, `Marked lecture as  ${newStatus}`, true);
				fetchTimetable();
			},
			() => showAlert(ERROR, 'Cannot change lecture status', true),
		);
	}

	useEffect(() => {
		if (user?.userId !== '' && user?.role === 'ADMIN') {
			router.replace('/dashboard');
		}
	}, [user]);

	useEffect(() => {
		if (user?.role === 'STUDENT' && program.programId !== '') {
			fetchTimetable();
		}
	}, [program]);

	useEffect(() => {
		if (user?.role === 'FACULTY') {
			fetchTimetable();
		}
	}, [user]);

	return (
		<>
			<Head>
				<title>View TimeTable</title>
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
			<Container>
				<section className="ml-3 h-full">
					<span className="flex justify-between items-center mr-6 text-2xl font-medium text-primary-800 dark:text-primary-500">
						<div className="flex items-center space-x-2">
							<CalendarDaysIcon className="m-8 h-8 mr-2" />
							View Timetable
						</div>
						<IconButton
							leadingIcon={<ArrowPathIcon className="w-5 h-5" />}
							onClick={() => fetchTimetable()}
						/>
					</span>
					<div className="py-5 grid grid-cols-6 gap-6">
						<div className="w-full col-span-6 flex flex-col space-y-2">
							{timetableData === null ? (
								<div className="text-2xl font-bold text-slate-700 dark:text-slate-300 text-center w-full">
									No timetable is assigned for your batch
								</div>
							) : (
								timetableData.days.map((day) => (
									<div
										key={day.weekDay}
										className="flex items-center border dark:border-none w-full min-h-[100px]"
									>
										<div className="bg-primary-200 mix-blend-overlay dark:bg-primary-900/20 h-full px-2 flex items-center justify-center w-[10%]">
											{WeekDay[day.weekDay]}
										</div>
										<div className="flex space-x-3 p-2 w-full h-full items-center bg-gradient-to-r from-primary-200 via-primary-100 dark:bg-gradient-to-r mix-blend-overlay dark:from-primary-900/30 dark:via-primary-900/10 dark:bg-gray-900 overflow-x-auto">
											{day.lectures.length === 0 ? (
												<div className="flex text-slate-700 dark:text-slate-300 items-center justify-center w-full">
													No lectures
												</div>
											) : (
												day.lectures.map((lecture) => (
													<div
														key={lecture.id}
														className={`p-4 min-w-[220px] bg-white dark:bg-slate-800 space-y-1 shadow-md rounded-lg flex flex-col items-start justify-between hover:scale-105 transition ${
															lecture.status ===
															LectureStatus.SCHEDULED
																? ''
																: 'bg-gray-200 shadow-none text-gray-800 dark:text-gray-600'
														}`}
													>
														<div className="font-semibold text-lg mb-2 flex w-full justify-between items-center">
															{lecture.courseName}
															{lecture.status ===
															LectureStatus.COMPLETED ? (
																<span className="text-green-600 text-sm font-normal">
																	Completed
																</span>
															) : lecture.status ===
																	LectureStatus.CANCELLED &&
															  user?.role ===
																	'STUDENT' ? (
																<span className="text-red-600 text-sm font-normal">
																	Cancelled
																</span>
															) : null}
															{user?.role ===
																'FACULTY' &&
															lecture.status !==
																LectureStatus.COMPLETED ? (
																<select
																	className={`text-sm font-normal border-none p-1 rounded bg-white dark:bg-slate-800 ${
																		lecture.status ===
																		LectureStatus.CANCELLED
																			? 'text-red-600'
																			: ''
																	}`}
																	name="lectureStatus"
																	value={
																		lecture.status
																	}
																	onChange={(
																		e,
																	) =>
																		lectureStatusChange(
																			lecture.batchId ||
																				'',
																			lecture.id,
																			e
																				.target
																				.value as LectureStatus,
																		)
																	}
																>
																	<option
																		value={
																			LectureStatus.CANCELLED
																		}
																	>
																		{lecture.status ===
																		LectureStatus.CANCELLED
																			? 'Cancelled'
																			: 'Cancel'}
																	</option>
																	<option
																		value={
																			LectureStatus.COMPLETED
																		}
																	>
																		Complete
																	</option>
																	<option
																		value={
																			LectureStatus.SCHEDULED
																		}
																	>
																		Scheduled
																	</option>
																</select>
															) : null}
														</div>
														<div className="text-sm flex space-x-1 items-center">
															<UserIcon className="w-4 h-4" />
															<div>
																{user?.role ===
																'FACULTY'
																	? `${
																			lecture.batchName ||
																			'Unknown batch'
																	  }`
																	: `Prof. ${lecture.professorName}`}
															</div>
														</div>
														<div className="text-sm flex space-x-1 items-center">
															<ClockIcon className="w-4 h-4" />
															<div>
																{lectureTimeLabel(
																	lecture.startTime,
																	lecture.endTime,
																)}
															</div>
														</div>
														<div className="text-sm flex space-x-1 items-center">
															<HomeIcon className="w-4 h-4" />
															<div>
																{lecture.room}
															</div>
														</div>
													</div>
												))
											)}
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</section>
			</Container>
		</>
	);
}
