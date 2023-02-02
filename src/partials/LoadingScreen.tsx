import { useState } from 'react';
import { useAuth } from 'src/context/AuthContext';

export default function LoadingScreen() {
	const { dataloaded, user } = useAuth();
	const [hideLoadingScreen, setHideLoadingScreen] = useState(false);

	if (dataloaded) {
		setTimeout(() => setHideLoadingScreen(true), 1000);
	}

	if (hideLoadingScreen) {
		return <span />;
	}
	return (
		// full sized div
		<div className="h-screen w-screen bg-white dark:bg-slate-900 flex justify-center absolute z-[5000]">
			<div className="flex justify-center items-center flex-col">
				<div
					className="spinner-border animate-spin-slow inline-block w-32 h-32  rounded-full"
					role="status"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-32 h-32"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
						/>
					</svg>
				</div>
				<div className="text-xl my-4">Loading...</div>
			</div>
		</div>
	);
}
