import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from 'src/context/AuthContext';
import { UserProvider } from 'src/context/UserContext';
import LoadingScreen from 'src/partials/LoadingScreen';
import { Alert } from 'src/Components/Alert';
import { ProgramProvider } from 'src/context/ProgramContext';
import { AdminProvider } from 'src/context/AdminContext';
import { GlobalContextProvider } from '../context/store';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GlobalContextProvider>
			<AuthProvider>
				<UserProvider>
					<ProgramProvider>
						<AdminProvider>
							<Alert>
								<LoadingScreen />
								<ThemeProvider
									attribute="class"
									enableSystem={false}
								>
									<Component {...pageProps} />
								</ThemeProvider>
							</Alert>
						</AdminProvider>
					</ProgramProvider>
				</UserProvider>
			</AuthProvider>
		</GlobalContextProvider>
	);
}
