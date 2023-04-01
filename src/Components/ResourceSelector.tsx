/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useAlert, WARNING } from './Alert';
import { Button } from './Button';
import {
	TBody,
	TDataCell,
	THead,
	THeadCell,
	THeaderRowCell,
	TRow,
} from './TableComponents';

interface ResourceSelectorProps<T extends { [k: string]: any }> {
	closePrompt: () => void;
	// eslint-disable-next-line @typescript-eslint/ban-types
	savePrompt: Function;
	data: Array<T>;
	columns: Array<string>;
	label: string;
	mutiselect?: boolean;
}

export interface ResourceSelectorStateType {
	show: boolean;
	data: Array<object>;
	column: Array<string>;
	label: string;
	multiSelect: boolean;
	// eslint-disable-next-line @typescript-eslint/ban-types
	savePrompt: Function;
}

export function defaultState() {
	return {
		show: false,
		data: [{}],
		column: [''],
		label: '',
		multiSelect: false,
		savePrompt: () => {},
	};
}

export default function ResourceSelector<T extends { [k: string]: any }>({
	closePrompt,
	savePrompt,
	data,
	columns,
	label,
	mutiselect = false,
}: ResourceSelectorProps<T>) {
	const { showAlert } = useAlert();
	const [selection, setSelection] = useState<{ [index: number]: boolean }>(
		{},
	);

	return (
		<div
			className="fixed w-full h-full left-0 top-0 z-[4000] bg-black/50  flex flex-col items-center justify-end sm:justify-center"
			role="banner"
			onClick={() => closePrompt()}
		>
			<div
				className="rounded-t-xl max-h-[80%] sm:rounded-xl py-4 px-6 bg-white dark:bg-gray-900 shadow space-y-4 min-w-[40%]"
				role="banner"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="text-xl font-semibold py-2 flex w-full justify-between items-center">
					<div>Select {label}</div>
					<XMarkIcon
						className="w-8 h-8 hover:bg-slate-300 dark:hover:bg-gray-700 p-2 rounded-full cursor-pointer"
						onClick={() => closePrompt()}
					/>
				</div>
				<table className="w-full">
					<THead>
						<THeaderRowCell>
							{columns.map((col) => (
								<THeadCell key={col}>{col}</THeadCell>
							))}
						</THeaderRowCell>
					</THead>
					<TBody className="overflow-y-auto">
						{data.length === 0 ? (
							<TRow>
								<TDataCell
									colSpan={columns.length}
									className="text-center"
								>
									No Data present
								</TDataCell>
							</TRow>
						) : (
							data.map((row, index) => (
								<TRow
									key={`row${index}`}
									className={`cursor-pointer ${
										selection[index]
											? 'bg-primary-200 hover:bg-primary-200/50'
											: ''
									}`}
									onClick={() => {
										if (!mutiselect) {
											const newSelection: {
												[key: number]: boolean;
											} = {};
											newSelection[index] =
												!selection[index];
											setSelection(newSelection);
											return;
										}
										const newSelection = { ...selection };
										newSelection[index] =
											!newSelection[index];
										setSelection(newSelection);
									}}
								>
									{columns.map((key) => (
										<TDataCell>{row[key]}</TDataCell>
									))}{' '}
								</TRow>
							))
						)}
					</TBody>
				</table>
				<div className="py-4 flex space-x-2">
					<Button
						label="Select"
						onClick={() => {
							if (!Object.values(selection).some((v) => v)) {
								showAlert(
									WARNING,
									'Please select any element',
									true,
								);
								return;
							}
							savePrompt(
								Object.keys(selection).map(
									(k) => data[parseInt(k, 10)],
								),
							);
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
