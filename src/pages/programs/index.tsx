import Sidebar from 'src/partials/Sidebar';
import Navbar from 'src/partials/Navbar';
import Head from 'next/head';
import Container from 'src/partials/Container';

export default function Programs() {
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
				<div className="w-full text-cool-gray-500 text-3xl flex justify-center items-center">
					Programs Page
				</div>
			</Container>
		</>
	);
}
