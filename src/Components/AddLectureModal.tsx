/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Lecture } from 'src/pages/timetable/manage';
import { useAdmin } from 'src/context/AdminContext';
import { Button } from './Button';
import InputField from './InputField';
import ResourceSelector, {
	ResourceSelectorStateType,
	defaultState,
} from './ResourceSelector';
import { FullBatch } from './EditBatchDetails';
import { ERROR, useAlert } from './Alert';

interface AddLectureProps {
	batchId: string;
	lectureData: Lecture;
	closePrompt: () => void;
	submitPrompt: (lecture: Lecture) => void;
}

export default function AddLectureModal({
	batchId,
	lectureData,
	closePrompt,
	submitPrompt,
}: AddLectureProps) {
	const { showAlert } = useAlert();
	const { getBatchDetails } = useAdmin();

	const [batchData, setBatchData] = useState<FullBatch>({
		batchName: '',
		courses: [],
		id: '',
		students: [],
		unassignedStudents: [],
	});
	const [resourcePicker, setResourcePicker] =
		useState<ResourceSelectorStateType>(defaultState());
	const [lecture, setLecture] = useState({
		...lectureData,
	});

	useEffect(() => {
		getBatchDetails(
			batchId,
			(data: FullBatch) => setBatchData(data),
			() => showAlert(ERROR, 'Failed to fetch batch details', false),
		);
	}, []);

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
				/>
			) : null}
			<div
				className="fixed w-full h-full left-0 top-0 z-[3500] bg-black/50  flex flex-col items-center justify-end sm:justify-center"
				role="banner"
				onClick={() => closePrompt()}
			>
				<div
					className="rounded-t-xl overflow-y-auto max-h-[90%] sm:rounded-xl py-4 px-6 bg-white dark:bg-gray-900 shadow space-y-4 min-w-[40%]"
					role="banner"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="text-xl font-semibold py-2 flex w-full justify-between items-center">
						<div>Add Lecture</div>
						<XMarkIcon
							className="w-8 h-8 hover:bg-slate-300 dark:hover:bg-gray-700 p-2 rounded-full cursor-pointer"
							onClick={() => closePrompt()}
						/>
					</div>
					<InputField
						type="text"
						label="Course"
						value={lecture.courseName}
						readOnly
						onClick={() =>
							setResourcePicker({
								data: [
									...batchData.courses.map((p) => ({
										...p,
										professorName: `${
											p?.professor?.firstName || 'Unknown'
										} ${p?.professor?.lastName || ''}`,
									})),
								],
								label: 'Courses',
								column: ['courseName', 'professorName'],
								show: true,
								multiSelect: false,
								savePrompt: (v: typeof batchData.courses) => {
									setLecture({
										...lecture,
										courseId: v[0].courseId,
										courseName: v[0].courseName,
										professorId: v[0]?.professor?.id || '',
										professorName: `${
											v[0]?.professor?.firstName ||
											'Unknown'
										} ${v[0]?.professor?.lastName || ''}`,
									});
									setResourcePicker(defaultState());
								},
							})
						}
					/>
					<InputField
						type="text"
						label="Professor"
						value={lecture.professorName}
						disabled
						readOnly
					/>
					<label className="block text-base font-medium text-primary-800 dark:text-primary-500">
						Start time (24hrs)
					</label>
					<div className="flex justify-between">
						<InputField
							min={0}
							max={23}
							type="number"
							placeholder="HH"
							value={lecture.startTime.hour}
							onChange={(e) =>
								setLecture({
									...lecture,
									startTime: {
										...lecture.startTime,
										hour: parseInt(e.target.value, 10),
									},
								})
							}
						/>
						<InputField
							min={0}
							max={23}
							type="number"
							placeholder="MM"
							value={lecture.startTime.minute}
							onChange={(e) =>
								setLecture({
									...lecture,
									startTime: {
										...lecture.startTime,
										minute: parseInt(e.target.value, 10),
									},
								})
							}
						/>
					</div>
					<label className="block text-base font-medium text-primary-800 dark:text-primary-500">
						End time (24hrs)
					</label>
					<div className="flex justify-between">
						<InputField
							min={0}
							max={23}
							type="number"
							placeholder="HH"
							value={lecture.endTime.hour}
							onChange={(e) =>
								setLecture({
									...lecture,
									endTime: {
										...lecture.endTime,
										hour: parseInt(e.target.value, 10),
									},
								})
							}
						/>
						<InputField
							min={0}
							max={23}
							type="number"
							placeholder="MM"
							value={lecture.endTime.minute}
							onChange={(e) =>
								setLecture({
									...lecture,
									endTime: {
										...lecture.endTime,
										minute: parseInt(e.target.value, 10),
									},
								})
							}
						/>
					</div>
					<Button label="Add" onClick={() => submitPrompt(lecture)} />
				</div>
			</div>
		</>
	);
}
