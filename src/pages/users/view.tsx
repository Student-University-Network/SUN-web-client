import { CakeIcon, UserIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ERROR, useAlert } from 'src/Components/Alert';
import { EmptyFunction } from 'src/Components/Utils';
import { useAdmin, UserDetailType } from 'src/context/AdminContext';
import { useAuth } from 'src/context/AuthContext';
import { useProgram } from 'src/context/ProgramContext';
import Container from 'src/partials/Container';
import Navbar from 'src/partials/Navbar';
import Sidebar from 'src/partials/Sidebar';

export default function ViewUserDetails() {
	const router = useRouter();
	const { getOtherUserDetails } = useAdmin();
	const { showAlert } = useAlert();
	const { program, getProgramDetails } = useProgram();
	const { userId } = router.query;
	const { user } = useAuth();

	const [profileData, setProfileData] = useState({
		id: '',
		role: 'STUDENT',
		firstName: '',
		middleName: '',
		lastName: '',
		dateOfBirth: '',
		gender: 'NONE',
	});
	const [academicDetails, setAcademicDetails] = useState({
		batchId: '',
		programId: '',
		programName: '',
		batchName: '',
		rollNo: 0,
	});

	function setUserData(data: UserDetailType) {
		setProfileData({
			...data.profile,
			middleName: data.profile.middleName || '',
			dateOfBirth: data.profile.dateOfBirth?.toJSON() || '',
			role: data.role,
		});
		setAcademicDetails({
			batchId: data.academicDetails?.batchId || '',
			programId: data.academicDetails?.programId || '',
			rollNo: data.academicDetails?.rollNo || 0,
			programName: data.academicDetails?.programName || '',
			batchName: data.academicDetails?.batchName || '',
		});
	}

	useEffect(() => {
		if (
			user?.userId !== '' &&
			['STUDENT', 'FACULTY', 'STAFF'].includes(user?.role || '')
		) {
			router.replace('/dashboard');
		}
	}, [user]);

	useEffect(() => {
		if (academicDetails.programId !== '') {
			getProgramDetails(
				academicDetails.programId,
				EmptyFunction,
				EmptyFunction,
			);
		}
	}, [academicDetails.programId]);

	useEffect(() => {
		if (program.programId === academicDetails.programId) {
			const newAcademicDetails = { ...academicDetails };
			newAcademicDetails.programName = program.programName;
			const batch = program.batches.find(
				(b) => b.id === academicDetails.batchId,
			);
			if (batch) {
				newAcademicDetails.batchName = batch.batchName;
			}
			setAcademicDetails(newAcademicDetails);
		}
	}, [program]);

	useEffect(() => {
		if (!router.isReady) return;
		if (userId) {
			if (userId instanceof Array<string>) {
				// TODO: IDK
			} else {
				getOtherUserDetails(userId, setUserData, (msg: string) => {
					showAlert(ERROR, `Failed to fetch details ${msg}`, false);
				});
			}
		}
	}, [router.isReady]);

	return (
		<>
			<Head>
				<title>View User Details</title>
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

			<Container>
				<div className="ml-1 sm:ml-3 pb-4 h-full">
					<form className="flex flex-col justify-center px-4 sm:px-6 overflow-hidden">
						<span className="inline-flex items-center text-2xl font-medium text-primary-800 dark:text-primary-500">
							<UserIcon className="w-8 h-8 my-5 mr-2 " />
							User Details
						</span>
						<div className="shadow-lg bg-gray-100 dark:bg-gray-700 p-4 rounded">
							<div className="text-2xl m-2 flex justify-between items-center">
								{profileData.firstName} {profileData.middleName}{' '}
								{profileData.lastName}
							</div>
							<div className="flex mt-4 flex-row items-center">
								<UserIcon
									className="w-5 h-5 m-2"
									strokeWidth={2}
								/>
								{profileData.role}
							</div>
							<div className="flex flex-row items-center">
								<CakeIcon
									className="w-5 h-5 m-2"
									strokeWidth={2}
								/>
								{profileData.dateOfBirth !== ''
									? profileData.dateOfBirth.split('T')[0]
									: 'NaN'}
							</div>
						</div>

						<div className=" flex justify-between items-center m-2 my-8 text-xl font-medium text-primary-800 dark:text-primary-500">
							Academic Details
						</div>
						<div className="shadow rounded p-4">
							<div className="my-4">
								Program enrolled:
								<span className="ml-4 text-xl font-bold">
									{academicDetails.programId === '' ? (
										<span className="w-full text-gray-600 ml-4 text-lg">
											No program assigned
										</span>
									) : (
										academicDetails.programName
									)}
								</span>
							</div>
							<div className="my-4">
								Batch:
								<span className="ml-4 text-xl font-bold">
									{academicDetails.batchId === '' ? (
										<span className="text-gray-600 text-lg">
											No batch assigned
										</span>
									) : (
										academicDetails.batchName
									)}
								</span>
							</div>
						</div>
					</form>
				</div>
			</Container>
		</>
	);
}
