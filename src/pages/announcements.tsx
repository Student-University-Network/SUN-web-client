/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Sidebar from 'src/partials/Sidebar';
import Navbar from 'src/partials/Navbar';
import Head from 'next/head';
import Container from 'src/partials/Container';
import {
	ArrowPathIcon,
	BellAlertIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from 'src/context/AuthContext';
import { useEffect, useState } from 'react';
import { useAnnouncement } from 'src/context/AnnouncementContext';
import InputField from 'src/Components/InputField';
import ResourceSelector, {
	ResourceSelectorStateType,
	defaultState,
} from 'src/Components/ResourceSelector';
import { ERROR, INFO, useAlert } from 'src/Components/Alert';
import { AnnouncementProgramList } from 'src/api/announcementsService';
import { Button, IconButton } from 'src/Components/Button';
import { EmptyFunction } from 'src/Components/Utils';

function ViewAnnouncements() {
	const { announcementsList, getAnnouncementsList } = useAnnouncement();
	return (
		<>
			<div className="flex justify-between w-full text-2xl my-4 mt-8">
				<div className="text-primary-800 font-medium">Notices</div>
				<IconButton
					leadingIcon={<ArrowPathIcon className="w-5 h-5" />}
					onClick={() =>
						getAnnouncementsList(EmptyFunction, EmptyFunction)
					}
				/>
			</div>
			<hr className="my-4" />
			<div className="flex flex-col space-y-2">
				{announcementsList.length === 0 ? (
					<div className="shadow w-full text-center mx- p-4 rounded flex flex-col justify-start">
						No announcements present
					</div>
				) : null}
				{announcementsList.map((a) => (
					<div className="shadow w-full mx- p-4 rounded flex flex-col justify-start">
						<div className="text-xl font-bold my-2">{a.title}</div>
						<div className="flex space-x-2">
							<UserIcon className="w-5 h-5" />
							<div>{a.title}</div>
						</div>
						<div className="my-4">{a.content}</div>
					</div>
				))}
			</div>
		</>
	);
}

function PostAnnouncements() {
	const { showAlert } = useAlert();
	const {
		getAnnouncementsList,
		getAnnouncementsProgramList,
		setAnnouncement,
	} = useAnnouncement();
	const [isGlobal, setIsGlobal] = useState('FOR_ALL');
	const [programList, setProgramList] = useState<
		Array<AnnouncementProgramList>
	>([]);
	const [newNotification, setNewNotification] = useState({
		title: '',
		content: '',
		programId: '',
		programName: '',
	});
	const [resourcePicker, setResourcePicker] =
		useState<ResourceSelectorStateType>(defaultState());

	useEffect(() => {
		getAnnouncementsProgramList(
			(data: Array<AnnouncementProgramList>) => {
				setProgramList(data);
			},
			() => showAlert(ERROR, 'Failed to get program list', true),
		);
	}, []);

	return (
		<>
			{resourcePicker.show ? (
				<ResourceSelector<(typeof resourcePicker.data)[0]>
					closePrompt={() => setResourcePicker(defaultState())}
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					savePrompt={(v: any) => resourcePicker.savePrompt(v)}
					data={resourcePicker.data}
					columns={resourcePicker.column}
					label={resourcePicker.label}
				/>
			) : null}
			<div className="w-full flex flex-col space-y-4 shadow bg-gray-100 dark:bg-gray-700 p-4 rounded">
				<div className="text-xl text-primary-800">
					Post new announcement
				</div>
				<InputField
					label="Title"
					value={newNotification.title}
					onChange={(e) => {
						setNewNotification({
							...newNotification,
							title: e.target.value,
						});
					}}
				/>
				<label className="font-medium text-primary-800">Content:</label>
				<textarea
					className="input-field"
					rows={5}
					value={newNotification.content}
					onChange={(e) => {
						setNewNotification({
							...newNotification,
							content: e.target.value,
						});
					}}
				/>
				<label className="font-medium text-primary-800">
					Announce to:
				</label>
				<select
					className="input-field mt-1 p-1"
					value={isGlobal}
					onChange={(e) => setIsGlobal(e.target.value)}
				>
					<option value="FOR_ALL">Announce all</option>
					<option value="FOR_PROGRAM">Announce in program</option>
				</select>
				{isGlobal === 'FOR_PROGRAM' ? (
					<InputField
						label="For program"
						value={newNotification.programName}
						readOnly
						onClick={(e) =>
							setResourcePicker({
								data: programList,
								label: 'Program',
								column: ['programName', 'tag'],
								show: true,
								multiSelect: false,
								savePrompt: (
									v: Array<AnnouncementProgramList>,
								) => {
									setNewNotification({
										...newNotification,
										programId: v[0].programId,
										programName: v[0].programName,
									});
									setResourcePicker(defaultState());
								},
							})
						}
					/>
				) : null}
				<div className="flex space-x-4 py-4">
					<Button
						label="Post announcement"
						onClick={() =>
							setAnnouncement(
								{
									title: newNotification.title,
									content: newNotification.content,
									programId: newNotification.programId,
								},
								() => {
									getAnnouncementsList(
										EmptyFunction,
										EmptyFunction,
									);
									showAlert(
										INFO,
										'Successfully posted new announcement',
										true,
									);
								},
								() =>
									showAlert(
										ERROR,
										'Failed to post new announcment',
										true,
									),
							)
						}
					/>
					<Button
						className="btn-outline"
						label="Reset"
						onClick={() => {
							setIsGlobal('FOR_ALL');
							setNewNotification({
								content: '',
								programId: '',
								programName: '',
								title: '',
							});
						}}
					/>
				</div>
			</div>
			<ViewAnnouncements />
		</>
	);
}

export default function Announcements() {
	const { user } = useAuth();

	return (
		<>
			<Head>
				<title>Notifications</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/notifications.svg" />
			</Head>
			<Navbar />
			<Sidebar />
			<Container>
				<section className="ml-3 h-full">
					<span className="flex justify-between items-center mr-6 text-2xl font-medium text-primary-800 dark:text-primary-500">
						<div className="flex items-center space-x-2">
							<BellAlertIcon className="m-8 h-8 mr-2" />
							Announcements
						</div>
					</span>
				</section>
				<div className="w-full px-4 sm:px-8">
					{user?.role === 'STUDENT' ? (
						<ViewAnnouncements />
					) : (
						<PostAnnouncements />
					)}
				</div>
			</Container>
		</>
	);
}
