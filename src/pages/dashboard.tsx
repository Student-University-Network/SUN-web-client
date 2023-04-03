/* eslint-disable no-nested-ternary */
import Sidebar from 'src/partials/Sidebar';
import Navbar from 'src/partials/Navbar';
import Head from 'next/head';
import Container from 'src/partials/Container';
import { AcademicCapIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { useAuth } from 'src/context/AuthContext';

export default function Dashboard() {
	const { user } = useAuth();

	return (
		<>
			<Head>
				<title>Dashboard</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/dashboard.svg" />
			</Head>
			<Navbar />
			<Sidebar />
			<Container>
				<div className="mx-4 my-2 pb-4 h-full">
					<div className="shadow-lg bg-gray-100 dark:bg-gray-700 p-6 px-8 rounded">
						<div className="font-light"> Welcome...</div>
						<div className="text-2xl sm:text-4xl my-2">
							{user?.firstName || 'Unknown'} {user?.lastName}
						</div>
						<div className="flex space-x-2 items-center">
							<div className="admin-tag text-sm">
								{user?.role || 'STUDENT'}
							</div>
						</div>
						{user?.role === 'STUDENT' ? (
							<div className="flex space-x-2 items-center">
								<AcademicCapIcon
									className="w-5 h-5 my-2 mr-2"
									strokeWidth={2}
								/>
								BEIT2
							</div>
						) : user?.role === 'FACULTY' ? (
							<div className="flex space-x-2 items-center">
								<BookOpenIcon
									className="w-5 h-5 my-2 mr-2"
									strokeWidth={2}
								/>
								4 Courses
							</div>
						) : null}
					</div>
				</div>
			</Container>
		</>
	);
}
