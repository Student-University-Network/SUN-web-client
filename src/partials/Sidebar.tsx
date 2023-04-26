import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import {
	AcademicCapIcon,
	HomeIcon,
	LightBulbIcon,
	UserGroupIcon,
	BellAlertIcon,
	CalendarDaysIcon,
	TableCellsIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from 'src/context/AuthContext';

type NavItemProps = {
	routerPath: string;
	hrefPath: string;
	icon: React.ReactNode;
	label: string;
};

function NavItem({ hrefPath, routerPath, icon, label }: NavItemProps) {
	return (
		<li
			className={`p-4 border-b-4 lg:border-b-0 lg:border-l-4 lg:h-11 focus:outline-none font-bold text-gray-500 dark:text-gray-400 hover:text-black hover:dark:text-white transition-colors duration-300 ${
				routerPath === hrefPath
					? 'border-primary-800 dark:border-primary-600 text-black dark:text-primary-100 '
					: 'border-transparent'
			}`}
		>
			<Link
				href={hrefPath}
				className="lg:flex lg:flex-row space-x-2 items-center"
			>
				<span>{icon}</span>
				<span className="hidden lg:block ml-2 text-sm tracking-wide truncate">
					{label}
				</span>
			</Link>
		</li>
	);
}

export default function Sidebar() {
	const router = useRouter();
	const { user } = useAuth();

	return (
		<div className="fixed bottom-0 z-10 lg:left-0 lg:top-4 lg:h-full lg:w-64 lg:mt-16 flex flex-col w-full overflow-y-hidden text-gray-900 transition-all duration-300 bg-white border-none shadow-md h-14 dark:bg-gray-900">
			<div className="flex flex-row lg:flex-col flex-grow overflow-x-auto overflow-y-hidden">
				<ul className="flex lg:space-y-1 lg:py-5 flex-row lg:flex-col justify-evenly lg:justify-start w-full items-stretch">
					<NavItem
						routerPath={router.pathname}
						hrefPath="/dashboard"
						icon={<HomeIcon className="w-5 h-5" strokeWidth={2} />}
						label="Dashboard"
					/>
					{user?.role === 'ADMIN' ? (
						<NavItem
							routerPath={router.pathname}
							hrefPath="/users"
							icon={
								<UserGroupIcon
									className="w-5 h-5"
									strokeWidth={2}
								/>
							}
							label="Users"
						/>
					) : null}
					{!['FACULTY'].includes(user?.role || '') ? (
						<NavItem
							routerPath={router.pathname}
							hrefPath="/programs"
							icon={
								<AcademicCapIcon
									className="w-5 h-5"
									strokeWidth={2}
								/>
							}
							label="Programs"
						/>
					) : null}
					{user?.role !== 'ADMIN' ? (
						<NavItem
							routerPath={router.pathname}
							hrefPath="/courses"
							icon={
								<LightBulbIcon
									className="w-5 h-5"
									strokeWidth={2}
								/>
							}
							label="Courses"
						/>
					) : null}

					{user?.role === 'ADMIN' ? (
						<NavItem
							routerPath={router.pathname}
							hrefPath="/timetable/manage"
							icon={
								<CalendarDaysIcon
									className="w-5 h-5"
									strokeWidth={2}
								/>
							}
							label="TimeTable"
						/>
					) : (
						<NavItem
							routerPath={router.pathname}
							hrefPath="/timetable/view"
							icon={
								<CalendarDaysIcon
									className="w-5 h-5"
									strokeWidth={2}
								/>
							}
							label="TimeTable"
						/>
					)}
					{user?.role !== 'ADMIN' ? (
						<NavItem
							routerPath={router.pathname}
							hrefPath="/attendance"
							icon={
								<TableCellsIcon
									className="w-5 h-5"
									strokeWidth={2}
								/>
							}
							label="Attendance"
						/>
					) : null}
					<NavItem
						routerPath={router.pathname}
						hrefPath="/notifications"
						icon={
							<BellAlertIcon
								className="w-5 h-5"
								strokeWidth={2}
							/>
						}
						label="Notifications"
					/>
				</ul>
				<ul className="hidden lg:block flex-col py-4 space-y-1 ">
					<li>
						<p className="mx-8 mb-4 font-normal text-gray-700 dark:text-gray-400">
							Settings
						</p>
					</li>
					<NavItem
						routerPath={router.pathname}
						hrefPath="/profile"
						icon={<HomeIcon className="w-5 h-5" strokeWidth={2} />}
						label="Profile"
					/>
				</ul>
				{/* <p className="hidden lg: px-5 py-3 mt-auto mb-24 text-xs text-center text-primary-800 dark:text-primary-200 md:block">
					Copyright @2023
				</p> */}
			</div>
		</div>
	);
}
