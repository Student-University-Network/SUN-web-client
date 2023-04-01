/* eslint-disable jsx-a11y/interactive-supports-focus */
import Sidebar from 'src/partials/Sidebar';
import Navbar from 'src/partials/Navbar';
import Head from 'next/head';
import Container from 'src/partials/Container';
import PageMetric from 'src/Components/PageMetric';
import InputField from 'src/Components/InputField';
import { Button } from 'src/Components/Button';
import Link from 'next/link';
import {
	THead,
	THeadCell,
	THeaderRowCell,
	TBody,
	TRow,
	TDataCell,
} from 'src/Components/TableComponents';
import { useProgram } from 'src/context/ProgramContext';
import { useEffect, useState } from 'react';
import { ERROR, useAlert } from 'src/Components/Alert';
import { useUser } from 'src/context/UserContext';
import {
	AcademicCapIcon,
	ChartBarIcon,
	PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

export default function Programs() {
	const router = useRouter();
	const { programsList, getProgramsList } = useProgram();
	const { showAlert } = useAlert();
	const { userId } = useUser();
	const [searchTerm1, setSearchTerm1] = useState('');
	const [searchTerm2, setSearchTerm2] = useState('');

	useEffect(() => {
		if (userId !== '') {
			getProgramsList(
				() => {},
				() => {
					showAlert(ERROR, 'Failed to get programs list', true);
				},
			);
		}
	}, [userId]);

	return (
		<>
			<Head>
				<title>Programs</title>
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
			<Container>
				<div className="grid grid-cols-1 gap-2 px-2 sm:grid-cols-2 lg:grid-cols-3">
					<PageMetric
						label="Active"
						value={programsList.length}
						logo={
							<ChartBarIcon
								height={30}
								width={30}
								strokeWidth={2}
								className="transition-transform duration-500 ease-in-out transform stroke-current text-primary-800 dark:text-gray-800"
							/>
						}
					/>
					<PageMetric
						label="Total"
						value={programsList.length}
						logo={
							<AcademicCapIcon
								height={30}
								width={30}
								strokeWidth={2}
								className="transition-transform duration-500 ease-in-out transform stroke-current text-primary-800 dark:text-gray-800"
							/>
						}
					/>
					<Link
						className="flex items-center justify-between p-3 font-medium border-2 rounded-md shadow-lg text-primary-800 dark:text-white dark:bg-gray-800 dark:border-gray-600 group hover:bg-primary-200 hover:dark:bg-primary-800 lg:-order-1"
						href="/programs/new"
					>
						<p className="pl-2 text-xl">New Program</p>
						<div className="flex items-center justify-center transition-all duration-300 transform bg-white rounded-full w-14 h-14 group-hover:rotate-12">
							<PlusCircleIcon
								height={30}
								width={30}
								strokeWidth={2}
								className="transition-transform duration-500 ease-in-out transform stroke-current text-primary-800 dark:text-gray-800"
							/>
						</div>
					</Link>
				</div>
				{/* Table for programs list */}
				<div className="flex flex-col gap-4 p-3 mx-3 mt-4 border-b md:flex-row lg:flex-row dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
					<InputField
						className=""
						label="Filter by Name"
						placeholder="Program Name"
						value={searchTerm1}
						onChange={(e) => setSearchTerm1(e.target.value)}
					/>
					<div>
						<InputField
							className=""
							label="Filter by TAG"
							placeholder="Tag"
							value={searchTerm2}
							onChange={(e) => setSearchTerm2(e.target.value)}
						/>
					</div>
					<div className="flex items-end">
						<Button
							className="btn-outline"
							onClick={() => {
								setSearchTerm1('');
								setSearchTerm2('');
							}}
							label="Clear filter"
						/>
					</div>
				</div>
				<div className="w-full px-3 overflow-x-auto rounded-sm">
					<table className="w-full">
						<THead>
							<THeaderRowCell>
								<THeadCell>Program Name</THeadCell>
								<THeadCell>Year</THeadCell>
								<THeadCell>Duration</THeadCell>
								<THeadCell>Tag</THeadCell>
							</THeaderRowCell>
						</THead>
						<TBody>
							{programsList.length === 0 ? (
								<TRow>
									<TDataCell
										colSpan={4}
										className="text-center"
									>
										No programs created
									</TDataCell>
								</TRow>
							) : null}
							{programsList.map((program) =>
								program.programName
									.toLowerCase()
									.indexOf(searchTerm1.toLowerCase()) !==
									-1 &&
								program.tag
									.toLowerCase()
									.indexOf(searchTerm2.toLowerCase()) !==
									-1 ? (
									<TRow
										className="cursor-pointer"
										key={program.programId}
										onClick={() => {
											router.push({
												pathname: '/programs/view',
												query: {
													id: program.programId,
												},
											});
										}}
									>
										<TDataCell className="font-semibold">
											{program.programName}
										</TDataCell>
										<TDataCell>
											{new Date(
												program.startYear,
											).getFullYear()}
											-
											{new Date(
												program.endYear,
											).getFullYear()}
										</TDataCell>
										<TDataCell>
											{program.duration / 2} years
										</TDataCell>
										<TDataCell>
											<span className="tag">
												{program.tag}
											</span>
										</TDataCell>
									</TRow>
								) : null,
							)}
						</TBody>
					</table>
				</div>
			</Container>
		</>
	);
}
