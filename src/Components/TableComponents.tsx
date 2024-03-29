/* eslint-disable react/require-default-props */
import { TableHTMLAttributes } from 'react';

function THead({
	className = '',
	children,
}: TableHTMLAttributes<HTMLTableCellElement>) {
	return <thead className={`px-4 py-3 ${className}`}>{children}</thead>;
}

function THeadCell({
	className = '',
	children,
	...rest
}: TableHTMLAttributes<HTMLTableCellElement>) {
	return (
		<th className={`px-4 py-3 font-bold ${className}`} {...rest}>
			{children}
		</th>
	);
}

function THeaderRowCell({
	className = '',
	children,
	...rest
}: TableHTMLAttributes<HTMLTableRowElement>) {
	return (
		<tr
			className={`text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b
             dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800 ${className}`}
			{...rest}
		>
			{children}
		</tr>
	);
}

function TBody({
	className = '',
	children,
	...rest
}: TableHTMLAttributes<HTMLTableSectionElement>) {
	return (
		<tbody
			className={`bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 ${className}`}
			{...rest}
		>
			{children}
		</tbody>
	);
}

function TRow({
	className = '',
	children,
	...rest
}: TableHTMLAttributes<HTMLTableRowElement>) {
	return (
		<tr
			className={`text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100
			 dark:hover:bg-gray-900 dark:text-gray-300 ${className}`}
			{...rest}
		>
			{children}
		</tr>
	);
}

interface TDataCellProps extends TableHTMLAttributes<HTMLTableCellElement> {
	colSpan?: number;
	rowSpan?: number;
}
function TDataCell({
	className = '',
	colSpan = 1,
	rowSpan = 1,
	children,
	...rest
}: TDataCellProps) {
	return (
		<td
			colSpan={colSpan}
			rowSpan={rowSpan}
			className={`p-4 text-sm ${className}`}
			{...rest}
		>
			{children}
		</td>
	);
}
interface TimeTableCellProps extends TDataCellProps {
	subjectName?: string;
	profName?: string;
}
function TimeTableCell({
	className = '',
	colSpan = 1,
	rowSpan = 1,
	subjectName,
	profName,
	children,
	...rest
}: TimeTableCellProps) {
	return (
		<td
			colSpan={colSpan}
			rowSpan={rowSpan}
			className={`p-4 text-sm ttcell-style  ${className}`}
			{...rest}
		>
			{children}
			{subjectName}
			<p className="italic">{profName}</p>
		</td>
	);
}
function TimeTableEmptyCell({
	className = '',
	colSpan = 7,
	rowSpan = 1,
	children,
	...rest
}: TimeTableCellProps) {
	return (
		<td
			colSpan={colSpan}
			rowSpan={rowSpan}
			className={`p-4 text-sm ttcell-style  ${className}`}
			{...rest}
		>
			Holiday
		</td>
	);
}

export {
	THead,
	THeadCell,
	THeaderRowCell,
	TBody,
	TRow,
	TDataCell,
	TimeTableCell,
	TimeTableEmptyCell,
};
