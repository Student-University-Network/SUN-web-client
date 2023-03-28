import { TableHTMLAttributes } from 'react';

// interface ITableProps extends TableHTMLAttributes<HTMLTableCellElement> {
// 	cellPadding: 2;
// }

function THead({
	className = '',
	children,
}: TableHTMLAttributes<HTMLTableCellElement>) {
	return <thead className={`px-4 py-3 ${className}`}>{children}</thead>;
}

function THeadCell({
	className = '',
	children,
}: TableHTMLAttributes<HTMLTableCellElement>) {
	return <th className={`px-4 py-3 ${className}`}>{children}</th>;
}

function THeaderRowCell({
	className = '',
	children,
}: TableHTMLAttributes<HTMLTableRowElement>) {
	return (
		<tr
			className={`text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b
             dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800 ${className}`}
		>
			{children}
		</tr>
	);
}

function TBody({
	className = '',
	children,
}: TableHTMLAttributes<HTMLTableSectionElement>) {
	return (
		<tbody
			className={`bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 ${className}`}
		>
			{children}
		</tbody>
	);
}

function TRowCell({
	className = '',
	children,
}: TableHTMLAttributes<HTMLTableRowElement>) {
	return (
		<tr
			className={`text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100
			 dark:hover:bg-gray-900 dark:text-gray-400 ${className}`}
		>
			{children}
		</tr>
	);
}
function TDataCell({
	className = '',
	children,
}: TableHTMLAttributes<HTMLTableCellElement>) {
	return <td className={`p-4 text-sm ${className}`}>{children}</td>;
}

export { THead, THeadCell, THeaderRowCell, TBody, TRowCell, TDataCell };
