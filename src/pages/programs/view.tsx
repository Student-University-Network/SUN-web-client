import {
	AcademicCapIcon,
	BookOpenIcon,
	CalendarIcon,
	InformationCircleIcon,
	PencilIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAlert, ERROR, INFO } from 'src/Components/Alert';
import { Button, IconButton } from 'src/Components/Button';
import EditSemestersAndCourses from 'src/Components/EditSemesterAndCourses';
import InputField from 'src/Components/InputField';
import {
	THead,
	THeaderRowCell,
	THeadCell,
	TBody,
	TDataCell,
	TRow,
} from 'src/Components/TableComponents';
import { Program, Semester, useProgram } from 'src/context/ProgramContext';
import Container from 'src/partials/Container';
import Navbar from 'src/partials/Navbar';
import Sidebar from 'src/partials/Sidebar';

function CourseBadge({ label }: { label: string }) {
	return (
		<div className="bg-gray-300 dark:bg-gray-700 rounded px-2 py-1 my-1 mx-2">
			{label}
		</div>
	);
}

export default function ViewProgram() {
	const router = useRouter();
	const { showAlert } = useAlert();

	const { id } = router.query;
	const { getProgramDetails, program, updateProgram } = useProgram();
	const [programData, setProgramData] = useState<Program>(program);
	const [editProgram, setEditProgram] = useState(false);
	const [editBatches, setEditBatches] = useState(false);
	const [editSemesters, setEditSemesters] = useState(false);
	const [inEditSemester, setInEditSemester] = useState<Semester>({
		semesterId: '',
		semesterName: '',
		order: 0,
		courses: [],
	});

	useEffect(() => {
		if (!router.isReady) return;
		if (id) {
			if (id instanceof Array<string>) {
				getProgramDetails(
					id[0],
					() => {},
					() => {
						showAlert(ERROR, 'Failed to fetch details', false);
					},
				);
			} else {
				getProgramDetails(
					id,
					() => {},
					() => {
						showAlert(ERROR, 'Failed to fetch details', false);
					},
				);
			}
		}
	}, [router.isReady]);

	useEffect(() => {
		if (program.programId !== '') {
			setProgramData(program);
		}
	}, [program]);

	function getFormattedDate(date: string) {
		const today = new Date(date);
		const yyyy = today.getFullYear();
		const m = today.getMonth() + 1;
		const d = today.getDate();
		let mm = '';
		let dd = '';
		if (d < 10) dd = `0${d}`;
		else dd = `${d}`;
		if (m < 10) mm = `0${m}`;
		else mm = `${m}`;

		return `${yyyy}-${mm}-${dd}`;
	}

	function submitUpdate(
		programId: string,
		payload: any,
		msg: string,
		hide: () => void,
	) {
		updateProgram(
			programId,
			payload,
			() => {
				showAlert(INFO, `${msg} updated successfully`, true);
				setProgramData(program);
				hide();
			},
			() => {
				showAlert(ERROR, `Failed to update ${msg}`, false);
			},
		);
	}

	function submitProgramDetails() {
		const payload = {
			programId: programData.programId,
			programName: programData.programName,
			startYear: new Date(programData.startYear).toISOString(),
			endYear: new Date(programData.endYear).toISOString(),
			duration: programData.duration,
			tag: programData.tag,
		};
		submitUpdate(programData.programId, payload, 'Program', () =>
			setEditProgram(false),
		);
	}

	function submitBatches() {
		const payload = {
			programId: programData.programId,
			batches: programData.batches,
		};
		submitUpdate(programData.programId, payload, 'batches', () =>
			setEditBatches(false),
		);
	}

	function submitSemester(updated: Semester) {
		const foundIndex = programData.semesters.findIndex(
			(sem) => sem.semesterId === updated.semesterId,
		);
		programData.semesters[foundIndex] = updated;
		const payload = {
			programId: programData.programId,
			semesters: programData.semesters,
		};
		submitUpdate(programData.programId, payload, 'Semesters', () => {
			setInEditSemester({
				semesterId: '',
				semesterName: '',
				order: 0,
				courses: [],
			});
			setEditSemesters(false);
		});
	}

	return (
		<>
			<Head>
				<title>View Program</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/programs.svg" />
			</Head>
			<Navbar />
			<Sidebar />
			{editSemesters ? (
				<EditSemestersAndCourses
					semestersData={inEditSemester}
					saveSemester={(newSemester: Semester) =>
						submitSemester(newSemester)
					}
					closePrompt={() => setEditSemesters(false)}
				/>
			) : null}
			<Container>
				<div className="ml-1 sm:ml-3 pb-4 h-full">
					<form className="flex flex-col justify-center px-3 overflow-hidden">
						<span className="inline-flex items-center text-2xl font-medium text-primary-800 dark:text-primary-500">
							<AcademicCapIcon className="w-8 h-8 my-5 mr-2 " />
							Program Details
						</span>
						<div className="shadow-lg bg-gray-100 dark:bg-gray-700 p-4 rounded">
							<div className="text-2xl m-2 flex justify-between items-center">
								{editProgram ? (
									<InputField
										label=""
										className=""
										value={programData.programName}
										onChange={(e) => {
											const data = { ...programData };
											data.programName = e.target.value;
											setProgramData(data);
										}}
									/>
								) : (
									programData.programName
								)}
								<Button
									className="text-base p-2"
									leadingIcon={
										<PencilIcon className="w-5 h-5" />
									}
									label={editProgram ? 'Cancel' : 'Edit'}
									onClick={() => {
										setProgramData(program);
										setEditProgram(!editProgram);
									}}
								/>
							</div>
							<div className="flex mt-4 flex-row items-center">
								<CalendarIcon
									className="w-5 h-5 m-2"
									strokeWidth={2}
								/>
								{editProgram ? (
									<>
										<InputField
											type="date"
											label=""
											className=""
											value={getFormattedDate(
												programData.startYear,
											)}
											onChange={(e) => {
												const data = { ...programData };
												data.startYear = e.target.value;
												setProgramData(data);
											}}
										/>
										<span>-</span>
										<InputField
											type="date"
											label=""
											className=""
											value={getFormattedDate(
												programData.endYear,
											)}
											onChange={(e) => {
												const data = { ...programData };
												data.endYear = e.target.value;
												setProgramData(data);
											}}
										/>
									</>
								) : (
									`${new Date(
										programData.startYear,
									).getFullYear()} -
								${new Date(programData.endYear).getFullYear()}`
								)}
							</div>
							<div className="flex flex-row items-center">
								<InformationCircleIcon
									className="w-5 h-5 m-2"
									strokeWidth={2}
								/>
								{editProgram ? (
									<InputField
										label=""
										className=""
										value={programData.tag}
										onChange={(e) => {
											const data = { ...programData };
											data.tag = e.target.value;
											setProgramData(data);
										}}
									/>
								) : (
									programData.tag
								)}
							</div>
							<div className="flex flex-row items-center">
								<BookOpenIcon
									className="w-5 h-5 m-2"
									strokeWidth={2}
								/>
								Total semesters:
								{editProgram ? (
									<InputField
										label=""
										className=""
										type="number"
										min={1}
										value={programData.duration}
										onChange={(e) => {
											const data = { ...programData };
											data.duration = parseInt(
												e.target.value,
												10,
											);
											setProgramData(data);
										}}
									/>
								) : (
									programData.duration
								)}
							</div>
							{editProgram ? (
								<div className="flex mt-4 flex-row items-center">
									<Button
										onClick={() => submitProgramDetails()}
										label="Save"
									/>
								</div>
							) : null}
						</div>

						<div className=" flex justify-between items-center m-1 my-8 ">
							<div className="text-xl font-medium text-primary-800 dark:text-primary-500">
								Batches
							</div>
							<div className="flex space-x-2">
								{editBatches ? (
									<Button
										className="text-base p-2"
										leadingIcon={
											<PencilIcon className="w-5 h-5" />
										}
										label="Save"
										onClick={() => submitBatches()}
									/>
								) : null}
								<Button
									className="text-base p-2"
									leadingIcon={
										<PencilIcon className="w-5 h-5" />
									}
									label={editBatches ? 'Cancel' : 'Edit'}
									onClick={() => {
										setProgramData(program);
										setEditBatches(!editBatches);
									}}
								/>
							</div>
						</div>

						{programData.batches.map((batch, bchIndex) => (
							<div key={batch.id} className="shadow rounded p-4">
								<div className="text-xl my-2">
									{editBatches ? (
										<InputField
											label=""
											className=""
											value={batch.batchName}
											onChange={(e) => {
												const data = { ...programData };
												data.batches[
													bchIndex
												].batchName = e.target.value;
												setProgramData(data);
											}}
										/>
									) : (
										batch.batchName
									)}
								</div>
								<div className="">Total students: 60</div>
							</div>
						))}

						<div className="flex justify-between items-center m-1 my-8 ">
							<div className="text-xl font-medium text-primary-800 dark:text-primary-500">
								Semesters
							</div>
						</div>

						<table className="w-full col-span-6">
							<THead>
								<THeaderRowCell>
									<THeadCell width="10%">Sr no.</THeadCell>
									<THeadCell width="30%">Semester</THeadCell>
									<THeadCell width="50">Courses</THeadCell>
									<THeadCell width="10%" />
								</THeaderRowCell>
							</THead>
							<TBody>
								{programData.semesters.map((sem, semIndex) => (
									<TRow key={sem.semesterId}>
										<TDataCell>{semIndex + 1}</TDataCell>
										<TDataCell>
											{sem.semesterName}
										</TDataCell>
										<TDataCell className="flex flex-wrap">
											{sem.courses.map((crs) => (
												<CourseBadge
													key={crs.courseId}
													label={crs.courseName}
												/>
											))}
										</TDataCell>
										<TDataCell>
											<IconButton
												className="btn-outline"
												leadingIcon={
													<PencilIcon className="w-5 h-5" />
												}
												onClick={() => {
													setInEditSemester(
														programData.semesters[
															semIndex
														],
													);
													setEditSemesters(true);
												}}
											/>
										</TDataCell>
									</TRow>
								))}
							</TBody>
						</table>
					</form>
				</div>
			</Container>
		</>
	);
}
