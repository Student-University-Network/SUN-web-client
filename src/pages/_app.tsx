import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from 'src/context/AuthContext';
import LoadingScreen from 'src/partials/LoadingScreen';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<LoadingScreen />
			<ThemeProvider attribute="class" enableSystem={false}>
				<Component {...pageProps} />
			</ThemeProvider>
		</AuthProvider>
	);
}
