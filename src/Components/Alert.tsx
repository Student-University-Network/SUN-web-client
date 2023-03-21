/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
	InformationCircleIcon,
	ExclamationTriangleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { createContext, useContext, useState } from 'react';

export const INFO = 'INFO';
export const WARNING = 'WARNING';
export const ERROR = 'ERROR';

type AlertContextType = {
	showAlert: (type: string, message: string, autoClose: boolean) => void;
};

const AlertContext = createContext<AlertContextType>({ showAlert: () => {} });

type Props = {
	children: React.ReactNode;
};

type AlertData = {
	type: string;
	message: string;
	autoClose: boolean;
};

export function Alert({ children }: Props) {
	const closeTimeout = 2000; // 2s
	const [alertList, setAlertList] = useState(Array<AlertData>());

	const closeAlert = (index: number, message: string) => {
		setAlertList(
			alertList.filter(
				(item, _index) => _index !== index && item.message === message,
			),
		);
	};

	const showAlert = (type: string, message: string, autoClose = true) => {
		const newAlert = { type, message, autoClose };
		const newList = [...alertList, newAlert];
		setAlertList(newList);
		if (autoClose) {
			setTimeout(() => {
				closeAlert(newList.length - 1, message);
			}, closeTimeout);
		}
	};

	const alertColor = (type: string) => {
		switch (type) {
			case INFO:
				return 'bg-green-500';
			case WARNING:
				return 'bg-orange-500';
			case ERROR:
				return 'bg-red-500';
			default:
				return 'bg-green-500';
		}
	};

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const value = {
		showAlert,
	};

	return (
		<>
			<div className="fixed items-stretch sm:w-[50vh] left-1 bottom-4 flex flex-col justify-end space-y-2 my-2 sm:my-4 mx-2 z-[5000] transition">
				{alertList.map((item, _index) => (
					<div
						key={item.type + _index.toString()}
						className={`shadow px-4 py-2 mx-1 my-1 text-white font-semibold flex justify-start space-x-4 items-center transition ${alertColor(
							item.type,
						)}`}
					>
						<div>
							{item.type === INFO ? (
								<InformationCircleIcon className="w-8 h-8" />
							) : (
								<ExclamationTriangleIcon className="w-8 h-8" />
							)}
						</div>
						<div className="py-1">{item.message}</div>
						<div
							className="p-2 cursor-pointer"
							onClick={() => closeAlert(_index, item.message)}
						>
							<XMarkIcon className="w-5 h-5" />
						</div>
					</div>
				))}
			</div>
			<AlertContext.Provider value={value}>
				{children}
			</AlertContext.Provider>
		</>
	);
}

export function useAlert() {
	return useContext(AlertContext);
}
