import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useUser } from 'src/context/UserContext';
import { ERROR, INFO, useAlert } from './Alert';
import { Button } from './Button';
import InputField from './InputField';

type Props = {
	closePrompt: () => void;
};

export default function ChangePassword({ closePrompt }: Props) {
	const { changeUserPassword } = useUser();
	const { showAlert } = useAlert();

	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const onSubmit = () => {
		changeUserPassword(
			{
				currentPassword,
				newPassword,
				confirmPassword,
			},
			(data: any) => {
				showAlert(INFO, 'Password updated successfully', true);
				closePrompt();
			},
			(data: any) => {
				const msg: string =
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					(data[0]?.message as string) || 'Invalid password';
				showAlert(ERROR, msg, true);
			},
		);
	};

	return (
		<div
			className="fixed w-full h-full left-0 top-0 z-[4000] bg-black/50  flex flex-col items-center justify-end sm:justify-center"
			role="banner"
			onClick={() => closePrompt()}
		>
			<div
				className="rounded-t-xl sm:rounded-xl py-4 px-6 bg-white dark:bg-gray-900 shadow space-y-4 min-w-[30%]"
				role="banner"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="text-xl font-semibold py-2 flex w-full justify-between items-center">
					<div>Change password</div>
					<XMarkIcon
						className="w-8 h-8 hover:bg-slate-300 dark:hover:bg-gray-700 p-2 rounded-full cursor-pointer"
						onClick={() => closePrompt()}
					/>
				</div>
				<InputField
					className=""
					type="password"
					name="currentPassword"
					label="Current Password"
					value={currentPassword}
					onChange={(e) => {
						setCurrentPassword(e.target.value);
					}}
				/>
				<InputField
					className=""
					type="text"
					name="newPassword"
					label="New Password"
					value={newPassword}
					onChange={(e) => {
						setNewPassword(e.target.value);
					}}
				/>
				<InputField
					className=""
					type="text"
					name="confirmNewPassword"
					label="Confirm New Password"
					value={confirmPassword}
					onChange={(e) => {
						setConfirmPassword(e.target.value);
					}}
				/>
				<div className="py-4">
					<Button label="Update" onClick={() => onSubmit()} />
				</div>
			</div>
		</div>
	);
}
