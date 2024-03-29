/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
	PlusCircleIcon,
	PlusIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ERROR, INFO, useAlert, WARNING } from 'src/Components/Alert';
import { Button, IconButton } from 'src/Components/Button';
import InputField from 'src/Components/InputField';
import ResourceSelector, {
	defaultState,
	ResourceSelectorStateType,
} from 'src/Components/ResourceSelector';
import {
	THead,
	THeaderRowCell,
	THeadCell,
	TBody,
	TRow,
	TDataCell,
} from 'src/Components/TableComponents';
import { downloadFile, EmptyFunction, parseCSV } from 'src/Components/Utils';
import { NewUserType, useAdmin } from 'src/context/AdminContext';
import { useAuth } from 'src/context/AuthContext';
import { ProgramListItem, useProgram } from 'src/context/ProgramContext';
import Container from 'src/partials/Container';
import Navbar from 'src/partials/Navbar';
import Sidebar from 'src/partials/Sidebar';

export default function NewUsers() {
	const { programsList, getProgramsList } = useProgram();
	const { createBatchUsers } = useAdmin();
	const { showAlert } = useAlert();
	const router = useRouter();
	const { user } = useAuth();
	const [newUsersData, setNewUsers] = useState<Array<NewUserType>>([]);
	const [defaultRole, setDefaultRole] = useState('STUDENT');

	const [usernameGenerate, setUsernamegGenerate] = useState(false);
	const [passwordGenerate, setPasswordGenerate] = useState(false);
	const [resourcePicker, setResourcePicker] =
		useState<ResourceSelectorStateType>(defaultState());

	useEffect(() => {
		if (
			user?.userId !== '' &&
			['STUDENT', 'FACULTY', 'STAFF'].includes(user?.role || '')
		) {
			router.replace('/dashboard');
		}
	}, [user]);

	useEffect(() => {
		if (programsList.length === 0) {
			getProgramsList(EmptyFunction, EmptyFunction);
		}
	}, [programsList]);

	useEffect(() => {
		if (!usernameGenerate) return;
		setNewUsers(
			newUsersData.map((usr) => ({
				...usr,
				username: `${usr.firstName + usr.lastName}${Math.round(
					Math.random() * 1e3,
				)}`,
			})),
		);
	}, [usernameGenerate]);

	useEffect(() => {
		if (!passwordGenerate) return;
		setNewUsers(
			newUsersData.map((usr) => ({
				...usr,
				password: `${usr.firstName + usr.lastName}@${Math.round(
					Math.random() * 1e4,
				)}`,
			})),
		);
	}, [passwordGenerate]);

	function setAllPrograms(v: Array<ProgramListItem>) {
		const newUsers = newUsersData.map((usr) => ({
			...usr,
			programId: v[0].programId,
			programName: v[0].programName,
		}));
		setNewUsers(newUsers);
		setResourcePicker(defaultState());
	}

	function setSingleProgram(v: Array<ProgramListItem>, index: number) {
		const newUsers = [...newUsersData];
		newUsers[index].programId = v[0].programId;
		newUsers[index].programName = v[0].programName;
		setNewUsers(newUsers);
		setResourcePicker(defaultState());
	}

	function submitCreateUsers() {
		if (newUsersData.length === 0) {
			showAlert(WARNING, 'Please add atleast one user', true);
			return;
		}
		if (
			newUsersData.some(
				(usr) =>
					usr.firstName.length === 0 ||
					usr.lastName.length === 0 ||
					usr.email.length === 0,
			)
		) {
			showAlert(WARNING, 'Please fill all required fields', true);
			return;
		}
		if (
			newUsersData.some(
				(usr) =>
					usr.role === 'STUDENT' &&
					(!usr.programId || usr.programId === ''),
			)
		) {
			showAlert(
				WARNING,
				'Please assign a program to all student users',
				true,
			);
			return;
		}
		createBatchUsers(
			newUsersData,
			(res: string) => {
				showAlert(INFO, 'Successfully created users', true);
				downloadFile(
					res,
					'text/csv',
					`NewUsers${Math.round(Math.random() * 1e4)}`,
				);
				router.push('/users');
			},
			() => {
				showAlert(ERROR, 'Failed to create users', true);
			},
		);
	}

	return (
		<>
			<Head>
				<title>Create new users</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/courses.svg" />
			</Head>
			<Navbar />
			<Sidebar />

			{resourcePicker.show ? (
				<ResourceSelector<(typeof resourcePicker.data)[0]>
					closePrompt={() => setResourcePicker(defaultState())}
					savePrompt={(v: any) => resourcePicker.savePrompt(v)}
					data={resourcePicker.data}
					columns={resourcePicker.column}
					label={resourcePicker.label}
				/>
			) : null}

			<Container>
				<section className="ml-3 h-full">
					<form className="flex flex-col justify-center px-3 overflow-hidden">
						<span className="inline-flex items-center text-2xl font-medium text-primary-800 dark:text-primary-500">
							<PlusCircleIcon className="m-8 h-8 mr-2" />
							Create New Users
						</span>
						<div className="px-4 py-5 sm:p-6 grid grid-cols-6 gap-6">
							<div className="flex justify-between items-center py-2 space-x-2 col-span-6">
								<InputField
									className="col-span-6 sm:col-span-3 p-1"
									label="Select from CSV file"
									type="file"
									accept=".csv"
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (!file) return;
										const reader = new FileReader();
										reader.onload = (event) => {
											try {
												const data = parseCSV(
													event.target?.result?.toString() ||
														'',
													',',
												);
												setNewUsers(
													data as Array<NewUserType>,
												);
											} catch (err) {
												showAlert(
													ERROR,
													'Failed to load from file',
													true,
												);
											}
										};
										reader.readAsText(file);
									}}
								/>
								<div className="flex space-x-2">
									<Button
										label="Create"
										onClick={() => submitCreateUsers()}
									/>
									<Button
										className="btn-outline"
										label="Reset"
										onClick={() => setNewUsers([])}
									/>
								</div>
							</div>
							<table className="w-full col-span-6">
								<THead>
									<THeaderRowCell>
										<THeadCell />
										<THeadCell />
										<THeadCell />
										<THeadCell>
											<div className="inline-flex flex-col items-start">
												<label
													htmlFor="role"
													className="font-medium  text-primary-800 dark:text-primary-500 "
												>
													Autogenerate
												</label>
												<input
													className="m-2"
													type="checkbox"
													name="generate-username"
													checked={usernameGenerate}
													onChange={(e) =>
														setUsernamegGenerate(
															e.target.checked,
														)
													}
												/>
											</div>
										</THeadCell>
										<THeadCell>
											<div className="inline-flex flex-col items-start">
												<label
													htmlFor="role"
													className="font-medium text-primary-800 dark:text-primary-500 "
												>
													Autogenerate:
												</label>
												<input
													className="m-2"
													type="checkbox"
													name="generate-password"
													checked={passwordGenerate}
													onChange={(e) =>
														setPasswordGenerate(
															e.target.checked,
														)
													}
												/>
											</div>
										</THeadCell>
										<THeadCell>
											<label
												htmlFor="role"
												className="font-medium text-primary-800 dark:text-primary-500 "
											>
												Default:
											</label>
											<select
												className="input-field mt-1 p-1"
												name="role"
												value={defaultRole}
												onChange={(e) => {
													setDefaultRole(
														e.target.value,
													);
													setNewUsers(
														newUsersData.map(
															(usr) => ({
																...usr,
																role: e.target
																	.value,
															}),
														),
													);
												}}
											>
												<option value="STUDENT">
													STUDENT
												</option>
												<option value="FACULTY">
													FACULTY
												</option>
												<option value="STAFF">
													STAFF
												</option>
												<option value="ADMIN">
													ADMIN
												</option>
											</select>
										</THeadCell>
										<THeadCell>
											<label
												htmlFor="role"
												className="font-medium text-primary-800 dark:text-primary-500 "
											>
												Default:
											</label>
											<div
												role="cell"
												className="bg-white mt-1.5 cursor-pointer dark:bg-gray-800 text-black dark:text-white border dark:border-gray-600 rounded-lg px-2 py-1"
												onClick={() => {
													setResourcePicker({
														data: programsList,
														label: 'Program',
														column: [
															'programName',
															'tag',
															'startYear',
															'endYear',
														],
														show: true,
														multiSelect: false,
														savePrompt: (
															v: ProgramListItem[],
														) => setAllPrograms(v),
													});
												}}
											>
												Select
											</div>
										</THeadCell>
										<THeadCell />
									</THeaderRowCell>
									<THeaderRowCell>
										<THeadCell>
											First name
											<sup className="text-red-900 text-xs">
												*
											</sup>
										</THeadCell>
										<THeadCell>
											Last name
											<sup className="text-red-900 text-xs">
												*
											</sup>
										</THeadCell>
										<THeadCell>
											Email
											<sup className="text-red-900 text-xs">
												*
											</sup>
										</THeadCell>
										<THeadCell>Username</THeadCell>
										<THeadCell>Password</THeadCell>
										<THeadCell>Role</THeadCell>
										<THeadCell>Program</THeadCell>
										<THeadCell />
									</THeaderRowCell>
								</THead>
								<TBody>
									{newUsersData.length === 0 ? (
										<TRow>
											<TDataCell
												colSpan={9}
												className="text-center"
											>
												No data filled
											</TDataCell>
										</TRow>
									) : null}
									{newUsersData.map((row, rowIndex) => (
										// eslint-disable-next-line react/no-array-index-key
										<TRow key={`new_user_${rowIndex}`}>
											<TDataCell className="p-0.5">
												<InputField
													className="input-field-unstyled"
													value={row.firstName}
													placeholder="null"
													onChange={(e) => {
														const newData = [
															...newUsersData,
														];
														newData[
															rowIndex
														].firstName =
															e.target.value;
														setNewUsers(newData);
													}}
												/>
											</TDataCell>
											<TDataCell className="p-0.5">
												<InputField
													className="input-field-unstyled"
													placeholder="null"
													value={row.lastName}
													onChange={(e) => {
														const newData = [
															...newUsersData,
														];
														newData[
															rowIndex
														].lastName =
															e.target.value;
														setNewUsers(newData);
													}}
												/>
											</TDataCell>
											<TDataCell className="p-0.5">
												<InputField
													className="input-field-unstyled"
													value={row.email}
													placeholder="null"
													onChange={(e) => {
														const newData = [
															...newUsersData,
														];
														newData[
															rowIndex
														].email =
															e.target.value;
														setNewUsers(newData);
													}}
												/>
											</TDataCell>
											<TDataCell className="p-0.5">
												<InputField
													className="input-field-unstyled"
													placeholder="empty"
													value={row.username}
													onChange={(e) => {
														if (usernameGenerate)
															return;
														const newData = [
															...newUsersData,
														];
														newData[
															rowIndex
														].username =
															e.target.value;
														setNewUsers(newData);
													}}
													disabled={usernameGenerate}
												/>
											</TDataCell>
											<TDataCell className="p-0.5">
												<InputField
													className="input-field-unstyled"
													placeholder="empty"
													value={row.password}
													onChange={(e) => {
														if (passwordGenerate)
															return;
														const newData = [
															...newUsersData,
														];
														newData[
															rowIndex
														].password =
															e.target.value;
														setNewUsers(newData);
													}}
													disabled={passwordGenerate}
												/>
											</TDataCell>
											<TDataCell className="p-0.5">
												<select
													className="select-field my-1"
													name="role"
													value={row.role}
													onChange={(e) => {
														const newData = [
															...newUsersData,
														];
														newData[rowIndex].role =
															e.target.value;
														setNewUsers(newData);
													}}
												>
													<option value="STUDENT">
														STUDENT
													</option>
													<option value="FACULTY">
														FACULTY
													</option>
													<option value="STAFF">
														STAFF
													</option>
													<option value="ADMIN">
														ADMIN
													</option>
												</select>
											</TDataCell>
											<TDataCell className="p-0.5">
												<InputField
													disabled={
														row.role !== 'STUDENT'
													}
													className="input-field-unstyled"
													placeholder="null"
													value={row.programName}
													onChange={(e) => {
														const newData = [
															...newUsersData,
														];
														newData[
															rowIndex
														].programName =
															e.target.value;
														setNewUsers(newData);
													}}
													onClick={() => {
														setResourcePicker({
															data: programsList,
															label: 'Program',
															column: [
																'programName',
																'tag',
																'startYear',
																'endYear',
															],
															show: true,
															multiSelect: false,
															savePrompt: (
																v: ProgramListItem[],
															) =>
																setSingleProgram(
																	v,
																	rowIndex,
																),
														});
													}}
												/>
											</TDataCell>
											<TDataCell>
												<IconButton
													className="btn-outline"
													onClick={() =>
														setNewUsers(
															newUsersData.filter(
																(
																	usr,
																	usrIndex,
																) =>
																	usrIndex !==
																	rowIndex,
															),
														)
													}
													leadingIcon={
														<TrashIcon className="w-5 h-5" />
													}
												/>
											</TDataCell>
										</TRow>
									))}
									<TRow>
										<TDataCell className="p-0" colSpan={9}>
											<Button
												className="btn-text w-full justify-center shadow-none border-none bg-transparent"
												leadingIcon={
													<PlusIcon
														className="w-4 h-4"
														strokeWidth={2}
													/>
												}
												label="New User"
												onClick={() =>
													setNewUsers([
														...newUsersData,
														{
															firstName: '',
															lastName: '',
															email: '',
															role: 'STUDENT',
														},
													])
												}
											/>
										</TDataCell>
									</TRow>
								</TBody>
							</table>
						</div>
					</form>
				</section>
			</Container>
		</>
	);
}
