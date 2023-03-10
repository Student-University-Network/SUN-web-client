import Head from 'next/head';

export default function FourOhFour() {
	return (
		<>
			<Head>
				<title>404</title>
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
			<main className="grid h-screen pb-16 overflow-y-auto place-items-center">
				<div className="container flex flex-col items-center mx-auto justify-evenly">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-12 h-12 mb-4 text-red-500"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
						/>
					</svg>

					<h1 className="mb-6 text-6xl font-semibold text-gray-700 dark:text-gray-200">
						404
					</h1>
					<p className="text-gray-700 dark:text-gray-300">
						Page not found. Check the address or <span>{`  `}</span>
						<a
							className="text-purple-600 hover:underline dark:text-purple-300"
							href="/"
						>
							go back
						</a>
						.
					</p>
				</div>
			</main>
		</>
	);
}
