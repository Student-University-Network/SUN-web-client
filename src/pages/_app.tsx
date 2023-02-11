import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from 'src/context/AuthContext';
import LoadingScreen from 'src/partials/LoadingScreen';
import { GlobalContextProvider } from '../context/store';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GlobalContextProvider>
			<AuthProvider>
				<LoadingScreen />
				<ThemeProvider attribute="class" enableSystem={false}>
					<Component {...pageProps} />
				</ThemeProvider>
			</AuthProvider>
		</GlobalContextProvider>
	);
}
