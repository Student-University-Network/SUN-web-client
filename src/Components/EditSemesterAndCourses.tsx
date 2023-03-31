import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from './Button';
import InputField from './InputField';
import {
	THead,
	THeaderRowCell,
	THeadCell,
	TRow,
	TDataCell,
	TBody,
} from './TableComponents';

export interface Semester {
	semesterId: string;
	semesterName: string;
	order: number;
	courses: Array<{
		courseId: string;
		courseName: string;
		totalLectures: number;
		compulsory: boolean;
	}>;
}

type EditSemesterAndCourseProps = {
	closePrompt: () => void;
	saveSemester: (crs: Semester) => void;
	semestersData: Semester;
};

export default function EditSemestersAndCourses({
	semestersData,
	closePrompt,
	saveSemester,
}: EditSemesterAndCourseProps) {
	const [semester, setSemester] = useState({
		semesterId: semestersData.semesterId,
		semesterName: semestersData.semesterName,
		order: semestersData.order,
	});
	const [courses, setCourses] = useState(semestersData.courses);

	return (
		<div
			className="fixed w-full h-full left-0 top-0 z-[4000] bg-black/50  flex flex-col items-center justify-end sm:justify-center"
			role="banner"
			onClick={() => closePrompt()}
		>
			<div
				className="rounded-t-xl sm:rounded-xl py-4 px-6 bg-white dark:bg-gray-900 shadow space-y-4 min-w-[40%]"
				role="banner"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="text-xl font-semibold py-2 flex w-full justify-between items-center">
					<div>Edit semesters</div>
					<XMarkIcon
						className="w-8 h-8 hover:bg-slate-300 dark:hover:bg-gray-700 p-2 rounded-full cursor-pointer"
						onClick={() => closePrompt()}
					/>
				</div>
				<InputField
					className=""
					type="text"
					name="semesterName"
					label="Semester name"
					value={semester.semesterName}
					onChange={(e) => {
						const newSemester = { ...semester };
						newSemester.semesterName = e.target.value;
						setSemester(newSemester);
					}}
				/>
				<InputField
					className=""
					type="number"
					min={0}
					name="order"
					label="Order (sequence)"
					disabled
					value={semester.order}
					onChange={(e) => {
						const newSemester = { ...semester };
						newSemester.order = parseInt(e.target.value, 10);
						setSemester(newSemester);
					}}
				/>
				<table className="w-full">
					<THead>
						<THeaderRowCell>
							<THeadCell width="40%">Course Name</THeadCell>
							<THeadCell width="20%">Total lectures</THeadCell>
							<THeadCell width="20%">Compulsory</THeadCell>
						</THeaderRowCell>
					</THead>
					<TBody>
						{courses.map((crs, crsIndex) => (
							<TRow>
								<TDataCell>
									<InputField
										label=""
										value={crs.courseName}
										onChange={(e) => {
											const newCourses = [...courses];
											newCourses[crsIndex].courseName =
												e.target.value;
											setCourses(newCourses);
										}}
									/>
								</TDataCell>
								<TDataCell>
									<InputField
										label=""
										type="number"
										min={1}
										value={crs.totalLectures}
										onChange={(e) => {
											const newCourses = [...courses];
											newCourses[crsIndex].totalLectures =
												parseInt(e.target.value, 10);
											setCourses(newCourses);
										}}
									/>
								</TDataCell>
								<TDataCell>
									<InputField
										label=""
										type="checkbox"
										min={1}
										checked={crs.compulsory}
										onChange={(e) => {
											const newCourses = [...courses];
											newCourses[crsIndex].compulsory =
												e.target.checked;
											setCourses(newCourses);
										}}
									/>
								</TDataCell>
							</TRow>
						))}
					</TBody>
				</table>
				<div className="my-3 flex space-x-2 justify-end">
					<Button
						label="Save"
						onClick={() => {
							const newSemester = {
								...semester,
								courses,
							};
							saveSemester(newSemester);
						}}
					/>
					<Button
						label="Cancel"
						className="btn-outline"
						onClick={() => closePrompt()}
					/>
				</div>
			</div>
		</div>
	);
}
