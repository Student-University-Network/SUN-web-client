/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/label-has-for */
import {
	PlusIcon,
	CalendarDaysIcon,
	PencilIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AddLectureModal from 'src/Components/AddLectureModal';
import { ERROR, INFO, WARNING, useAlert } from 'src/Components/Alert';
import { Button } from 'src/Components/Button';
import InputField from 'src/Components/InputField';
import ResourceSelector, {
	ResourceSelectorStateType,
	defaultState,
} from 'src/Components/ResourceSelector';
import { EmptyFunction } from 'src/Components/Utils';
import { useAdmin } from 'src/context/AdminContext';
import { useAuth } from 'src/context/AuthContext';
import {
	Batch,
	Program,
	ProgramListItem,
	useProgram,
} from 'src/context/ProgramContext';
import { useUser } from 'src/context/UserContext';
import Container from 'src/partials/Container';
import Navbar from 'src/partials/Navbar';
import Sidebar from 'src/partials/Sidebar';

/**
 * ? IMP
 *
 * 1. weekDays are stored as Integers (0-6) because of JS
 * for kotlin or java it should be incremented by 1 (1-7)
 *
 * 2. startTime is stored in Hours (0-23) and Minutes (0-59)
 *
 */

export interface Timetable {
	batchId: string;
	batchName: string;
	days: Array<Day>;
}

export interface Day {
	weekDay: number;
	lectures: Array<Lecture>;
}

export interface Lecture {
	id: string;
	courseId: string;
	courseName: string;
	professorId: string;
	professorName: string;
	startTime: {
		hour: number;
		minute: number;
	};
	endTime: {
		hour: number;
		minute: number;
	};
}

const defaultData: Timetable = {
	batchId: '',
	batchName: '',
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	days: [...Array(7)].map((_, i) => ({ weekDay: i, lectures: [] })),
};
const defaultInEditLecture = {
	id: '',
	courseId: '',
	courseName: '',
	professorId: '',
	professorName: '',
	startTime: {
		hour: 0,
		minute: 0,
	},
	endTime: {
		hour: 0,
		minute: 0,
	},
};

enum WeekDay {
	Sunday = 0,
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6,
}

export default function ManageTimetable() {
	const { showAlert } = useAlert();
	const { userId } = useUser();
	const { user } = useAuth();
	const { programsList, getProgramDetails, getProgramsList } = useProgram();
	const { setTimetable, getTimetable } = useAdmin();
	const router = useRouter();
	const { programId, batchId } = router.query;

	const [currentProgram, setCurrentProgram] =
		useState<ProgramListItem | null>(null);
	const [programDetails, setProgramDetails] = useState<Program>({
		batches: [],
		batchId: '',
		currentSemester: 0,
		duration: 0,
		endYear: '',
		programId: '',
		programName: '',
		semesters: [],
		startYear: '',
		tag: '',
	});
	const [currentBatch, setCurrentBatch] = useState<Batch>({
		id: '',
		batchName: '',
		students: 0,
	});
	const [timetableData, setTimetableData] = useState<Timetable>(defaultData);
	const [showAddDayModal, setShowAddDayModal] = useState(false);
	const [dayToAdd, setDayToAdd] = useState<WeekDay>(0);
	const [inEditLecture, setInEditLecture] =
		useState<Lecture>(defaultInEditLecture);
	const [resourcePicker, setResourcePicker] =
		useState<ResourceSelectorStateType>(defaultState());

	useEffect(() => {
		if (
			userId !== '' &&
			['STUDENT', 'FACULTY', 'STAFF'].includes(user?.role || '')
		) {
			router.replace('/dashboard');
			return;
		}
		getProgramsList(EmptyFunction, () =>
			showAlert(ERROR, 'Unable to fetch programs list', false),
		);
	}, [userId]);

	useEffect(() => {
		if (!router.isReady) return;
		if (programId && batchId) {
			if (batchId instanceof Array<string>) {
				// pass
			} else {
				const p =
					programsList.find((_p) => _p.programId === programId) ||
					null;
				setCurrentProgram(p);
			}
		}
	}, [router.isReady]);

	useEffect(() => {
		if (currentProgram !== null && currentProgram?.programId !== '') {
			getProgramDetails(
				currentProgram.programId,
				(data: Program) => {
					setProgramDetails(data);
					if (batchId) {
						const b = data.batches.find((_b) => _b.id === batchId);
						if (b) {
							setCurrentBatch(b);
						}
						getTimetable(
							b?.id || '',
							(tt: Timetable) => {
								if (tt) {
									setTimetableData({ ...tt });
								}
							},
							() =>
								showAlert(
									ERROR,
									'Unable to fetch timetable for the batch',
									false,
								),
						);
					}
				},
				() =>
					showAlert(
						ERROR,
						'Unable to fetch batch list for the program',
						false,
					),
			);
		}
	}, [currentProgram]);

	function lectureTimeLabel(
		start: { hour: number; minute: number },
		end: { hour: number; minute: number },
	) {
		return `${start.hour < 10 ? `0${start.hour}` : start.hour}:${
			start.minute < 10 ? `0${start.minute}` : start.minute
		} - ${end.hour < 10 ? `0${end.hour}` : end.hour}:${
			end.minute < 10 ? `0${end.minute}` : end.minute
		}`;
	}

	function addLecture(data: Lecture) {
		const newTT = { ...timetableData };
		if (inEditLecture.id !== '') {
			setTimetableData({
				...timetableData,
				days: timetableData.days.map((d) => ({
					...d,
					lectures: d.lectures.map((l) => {
						if (l.id === data.id) {
							return { ...data };
						}
						return l;
					}),
				})),
			});
			setDayToAdd(0);
			setInEditLecture(defaultInEditLecture);
			setShowAddDayModal(false);
			return;
		}
		newTT.days = newTT.days.map((d) => {
			if (d.weekDay === dayToAdd) {
				return {
					...d,
					lectures: [
						...d.lectures,
						{ ...data, id: d.lectures.length.toString() },
					],
				};
			}
			return d;
		});
		setTimetableData(newTT);
		setShowAddDayModal(false);
	}

	function onSumitTimetable() {
		setTimetable(
			timetableData,
			() => showAlert(INFO, 'Timetable saved successfully', true),
			() => showAlert(ERROR, 'Failed to save timetable', false),
		);
	}

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

			{showAddDayModal ? (
				<AddLectureModal
					batchId={currentBatch.id}
					lectureData={inEditLecture}
					closePrompt={() => setShowAddDayModal(false)}
					submitPrompt={(data: Lecture) => addLecture(data)}
				/>
			) : null}

			<Container>
				<section className="ml-3 h-full px-4 sm:px-6 ">
					<form className="flex flex-col justify-center overflow-hidden">
						<span className="inline-flex items-center text-2xl font-medium text-primary-800 dark:text-primary-500">
							<CalendarDaysIcon className="my-8 h-8 mr-2" />
							Manage Timetable
						</span>
						<div className="flex justify-between items-center py-2 space-x-2 col-span-6">
							<div className="flex space-x-2">
								<InputField
									label="Select Program"
									value={currentProgram?.programName}
									readOnly
									onClick={() =>
										setResourcePicker({
											data: programsList,
											label: 'Program',
											column: [
												'programName',
												'startYear',
												'endYear',
												'tag',
											],
											show: true,
											multiSelect: false,
											savePrompt: (
												v: ProgramListItem[],
											) => {
												setCurrentProgram(v[0]);
												setResourcePicker(
													defaultState(),
												);
											},
										})
									}
								/>
								<InputField
									label="Select Batch"
									value={currentBatch.batchName}
									readOnly
									onClick={() =>
										setResourcePicker({
											data: programDetails.batches,
											label: 'Batch',
											column: ['batchName'],
											show: true,
											multiSelect: false,
											savePrompt: (v: Batch[]) => {
												setCurrentBatch(v[0]);
												setTimetableData({
													...timetableData,
													batchId: v[0].id,
													batchName: v[0].batchName,
												});
												setResourcePicker(
													defaultState(),
												);
											},
										})
									}
								/>
							</div>
							<div className="flex space-x-2">
								<Button
									label="Save"
									onClick={() => onSumitTimetable()}
								/>
								<Button
									className="btn-outline"
									label="Clear"
									onClick={() =>
										setTimetableData(defaultData)
									}
								/>
							</div>
						</div>
						<div className="py-5 grid grid-cols-6 gap-6">
							<div className="w-full col-span-6 flex flex-col space-y-2">
								{timetableData.days.map((day) => (
									<div
										key={day.weekDay}
										className="flex items-center border dark:border-none w-full"
									>
										<div className="bg-primary-200 mix-blend-overlay dark:bg-primary-900/20 h-full px-2 flex items-center justify-center w-[10%]">
											{WeekDay[day.weekDay]}
										</div>
										<div className="flex space-x-3 p-2 w-full items-center bg-gradient-to-r from-primary-200 via-primary-100 dark:bg-gradient-to-r mix-blend-overlay dark:from-primary-900/30 dark:via-primary-900/10 dark:bg-gray-900 overflow-x-auto">
											{day.lectures.map((lecture) => (
												<div
													key={lecture.courseId}
													className="p-4 min-w-[220px] bg-white dark:bg-slate-800 shadow-md rounded-lg flex flex-col items-start justify-between hover:scale-105 transition"
												>
													<div className="font-semibold text-lg mb-2 flex w-full justify-between items-center">
														<div>
															{lecture.courseName}
														</div>
														<div className="flex space-x-2">
															<PencilIcon
																className="w-9 h-9 rounded-lg cursor-pointer hover:bg-primary-200 p-2 text-primary-900 dark:text-primary-300"
																onClick={() => {
																	setDayToAdd(
																		day.weekDay,
																	);
																	setInEditLecture(
																		lecture,
																	);
																	setShowAddDayModal(
																		true,
																	);
																}}
															/>
															<TrashIcon
																className="w-9 h-9 rounded-lg cursor-pointer hover:bg-primary-200 p-2 text-primary-900 dark:text-primary-300"
																onClick={() => {
																	setTimetableData(
																		{
																			...timetableData,
																			days: timetableData.days.map(
																				(
																					d,
																				) => ({
																					...d,
																					lectures:
																						d.lectures.filter(
																							(
																								l,
																							) =>
																								l.id !==
																								lecture.id,
																						),
																				}),
																			),
																		},
																	);
																}}
															/>
														</div>
													</div>
													<div className="text-sm">
														Prof.{' '}
														{lecture.professorName}
													</div>
													<div className="text-sm">
														{lectureTimeLabel(
															lecture.startTime,
															lecture.endTime,
														)}
													</div>
												</div>
											))}
											<div
												className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md hover:scale-105 transition"
												role="button"
												onClick={() => {
													if (
														currentBatch.id === ''
													) {
														showAlert(
															WARNING,
															'Please select a batch to manage timetable',
															true,
														);
														return;
													}
													setDayToAdd(day.weekDay);
													setShowAddDayModal(true);
												}}
											>
												<PlusIcon className="w-7 h-7 text-primary-900 dark:text-primary-300" />
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</form>
				</section>
			</Container>
		</>
	);
}
