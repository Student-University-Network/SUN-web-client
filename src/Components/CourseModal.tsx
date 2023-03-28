import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useAlert, WARNING } from './Alert';
import { Button } from './Button';
import InputField from './InputField';

interface Course {
	index: number;
	courseName: string;
	totalLectures: number;
	compulsory: boolean;
}

type CourseModalProps = {
	closePrompt: () => void;
	saveCourse: (crs: Course) => void;
	courseData: Course;
};

function CourseModal({
	closePrompt,
	saveCourse,
	courseData,
}: CourseModalProps) {
	const [courseName, setCourseName] = useState(courseData.courseName);
	const [totalLectures, setTotalLectures] = useState(
		courseData.totalLectures,
	);
	const [compulsory, setCompulsory] = useState(courseData.compulsory);

	const { showAlert } = useAlert();

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
					<div>
						{courseData.courseName === ''
							? 'Added Course'
							: 'Edit Course'}
					</div>
					<XMarkIcon
						className="w-8 h-8 hover:bg-slate-300 dark:hover:bg-gray-700 p-2 rounded-full cursor-pointer"
						onClick={() => closePrompt()}
					/>
				</div>
				<InputField
					className=""
					type="text"
					name="courseName"
					label="Course name"
					value={courseName}
					onChange={(e) => {
						setCourseName(e.target.value);
					}}
				/>
				<InputField
					className=""
					type="number"
					name="totalLectures"
					label="Total lectures"
					value={totalLectures}
					min={1}
					onChange={(e) => {
						setTotalLectures(parseInt(e.target.value, 10));
					}}
				/>
				<InputField
					className="flex justify-start"
					type="checkbox"
					name="compulsory"
					label="Compulsory"
					checked={compulsory}
					onChange={(e) => {
						setCompulsory(e.target.checked);
					}}
				/>
				<div className="py-4">
					<Button
						label="Save"
						onClick={() => {
							if (courseName === '') {
								return showAlert(
									WARNING,
									'Please enter course name',
									true,
								);
							}
							saveCourse({
								index: courseData.index,
								courseName,
								totalLectures,
								compulsory,
							});
							return closePrompt();
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default CourseModal;
