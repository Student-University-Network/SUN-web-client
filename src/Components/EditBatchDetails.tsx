import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { UserListItem, useAdmin } from 'src/context/AdminContext';
import { Button, IconButton } from './Button';
import InputField from './InputField';
import { ERROR, INFO, useAlert } from './Alert';
import {
	TBody,
	TDataCell,
	THead,
	THeadCell,
	THeaderRowCell,
	TRow,
} from './TableComponents';
import ResourceSelector, {
	ResourceSelectorStateType,
	defaultState,
} from './ResourceSelector';
import { EmptyFunction } from './Utils';

export interface FullBatch {
	id: string;
	batchName: string;
	unassignedStudents: Array<{
		id: string;
		firstName: string;
		lastName: string;
	}>;
	students: Array<{
		id: string;
		firstName: string;
		lastName: string;
	}>;
	courses: Array<{
		courseId: string;
		courseName: string;
		professor?: {
			id?: string;
			firstName?: string;
			lastName?: string;
		};
	}>;
}

type EditBatchDetailsProps = {
	closePrompt: () => void;
	saveBatch: () => void;
	batchData: { id: string; batchName: string };
};

export default function EditBatchDetails({
	closePrompt,
	saveBatch,
	batchData,
}: EditBatchDetailsProps) {
	const { showAlert } = useAlert();
	const { getBatchDetails, usersList, getUsersList, saveBatchDetails } =
		useAdmin();

	const [batch, setBatch] = useState<FullBatch>({
		id: batchData.id,
		batchName: batchData.batchName,
		unassignedStudents: [],
		students: [],
		courses: [],
	});
	const [resourcePicker, setResourcePicker] =
		useState<ResourceSelectorStateType>(defaultState());

	useEffect(() => {
		getBatchDetails(
			batchData.id,
			(data: FullBatch) => setBatch(data),
			() => showAlert(ERROR, 'Failed to fetch batch details', true),
		);
		if (usersList.length === 0) {
			getUsersList(EmptyFunction, () =>
				showAlert(ERROR, 'Failed to fetch faculty list', true),
			);
		}
	}, []);

	function setProfessor(v: UserListItem[], index: number) {
		const newBatch = { ...batch };
		newBatch.courses[index].professor = {
			id: v[0].id,
			firstName: v[0].firstName,
			lastName: v[0].lastName,
		};
		setResourcePicker(defaultState());
		setBatch(newBatch);
	}

	function assignStudent(v: UserListItem[]) {
		const newBatch = { ...batch };
		v.forEach((_v) => {
			newBatch.students.push(_v);
			newBatch.unassignedStudents = newBatch.unassignedStudents.filter(
				(u) => u.id !== _v.id,
			);
		});
		setResourcePicker(defaultState());
		setBatch(newBatch);
	}

	function onSubmitBatch() {
		saveBatchDetails(
			batch,
			() => {
				showAlert(INFO, 'Saved batch details', true);
				saveBatch();
			},
			() => showAlert(ERROR, 'Failed to save batch details', true),
		);
	}

	return (
		<>
			{resourcePicker.show ? (
				<ResourceSelector<(typeof resourcePicker.data)[0]>
					closePrompt={() => setResourcePicker(defaultState())}
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					savePrompt={(v: any) => resourcePicker.savePrompt(v)}
					data={resourcePicker.data}
					columns={resourcePicker.column}
					label={resourcePicker.label}
					mutiselect={resourcePicker.multiSelect}
				/>
			) : null}
			<div
				className="fixed w-full h-full left-0 top-0 z-[3500] bg-black/50  flex flex-col items-center justify-end sm:justify-center"
				role="banner"
				onClick={() => closePrompt()}
			>
				<div
					className="rounded-t-xl overflow-y-auto sm:rounded-xl py-4 px-6 bg-white dark:bg-gray-900 shadow space-y-4 min-w-[60%]"
					role="banner"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="text-xl font-semibold py-2 flex w-full justify-between items-center">
						<div>Edit batch</div>
						<XMarkIcon
							className="w-8 h-8 hover:bg-slate-300 dark:hover:bg-gray-700 p-2 rounded-full cursor-pointer"
							onClick={() => closePrompt()}
						/>
					</div>
					<InputField
						label="Batch Name"
						value={batch.batchName}
						onChange={(e) =>
							setBatch({ ...batch, batchName: e.target.value })
						}
					/>
					<InputField
						disabled
						readOnly
						label="Total students"
						value={batch.students.length}
					/>
					<div className="text-xl font-medium text-primary-800 dark:text-primary-500">
						Courses
					</div>
					<table className="w-full">
						<THead>
							<THeaderRowCell>
								<THeadCell className="10%">Sr.no</THeadCell>
								<THeadCell className="45%">
									Course name
								</THeadCell>
								<THeadCell className="45%">Professor</THeadCell>
							</THeaderRowCell>
						</THead>
						<TBody>
							{batch.courses.map((crs, crsIndex) => (
								<TRow key={crs.courseId}>
									<TDataCell>{crsIndex + 1}</TDataCell>
									<TDataCell>{crs.courseName}</TDataCell>
									<TDataCell>
										<InputField
											placeholder="null"
											value={`${
												crs.professor?.firstName || ''
											} ${crs.professor?.lastName || ''}`}
											readOnly
											onClick={(e) =>
												setResourcePicker({
													data: usersList.filter(
														(usr) =>
															usr.role ===
															'FACULTY',
													),
													label: 'Professor',
													column: [
														'firstName',
														'lastName',
														'role',
													],
													show: true,
													multiSelect: false,
													savePrompt: (
														v: UserListItem[],
													) =>
														setProfessor(
															v,
															crsIndex,
														),
												})
											}
										/>
									</TDataCell>
								</TRow>
							))}
						</TBody>
					</table>
					<div className="text-xl font-medium text-primary-800 dark:text-primary-500">
						Students
					</div>
					<table className="w-full">
						<THead>
							<THeaderRowCell>
								<THeadCell className="10%">Sr no.</THeadCell>
								<THeadCell className="65%">
									Student name
								</THeadCell>
								<THeadCell className="25%" />
							</THeaderRowCell>
						</THead>
						<TBody>
							{batch.students.map((student, stuIndex) => (
								<TRow>
									<TDataCell>{stuIndex + 1}</TDataCell>
									<TDataCell>
										{student.firstName} {student.lastName}
									</TDataCell>
									<TDataCell>
										<IconButton
											leadingIcon={
												<TrashIcon className="w-5 h-5" />
											}
											onClick={() => {
												setBatch({
													...batch,
													students:
														batch.students.filter(
															(s) =>
																s.id !==
																student.id,
														),
													unassignedStudents: [
														...batch.unassignedStudents,
														student,
													],
												});
											}}
										/>
									</TDataCell>
								</TRow>
							))}
							<TRow>
								<TDataCell className="p-0" colSpan={3}>
									<Button
										className="btn-text w-full justify-center shadow-none border-none bg-transparent"
										leadingIcon={
											<PlusIcon
												className="w-4 h-4"
												strokeWidth={2}
											/>
										}
										label="Assign student"
										onClick={() =>
											setResourcePicker({
												data: batch.unassignedStudents,
												label: 'Student',
												column: [
													'firstName',
													'lastName',
													'role',
												],
												show: true,
												multiSelect: true,
												savePrompt: (
													v: UserListItem[],
												) => assignStudent(v),
											})
										}
									/>
								</TDataCell>
							</TRow>
						</TBody>
					</table>
					<div className="my-3 flex space-x-2 justify-end">
						<Button label="Save" onClick={() => onSubmitBatch()} />
						<Button
							label="Cancel"
							className="btn-outline"
							onClick={() => closePrompt()}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
