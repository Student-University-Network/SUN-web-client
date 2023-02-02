/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from 'react-hook-form';
import Button from 'src/Components/Button';
import React, { useState } from 'react';
import Head from 'next/head';

import { useAuth } from 'src/context/AuthContext';
import { useRouter } from 'next/router';

interface IFormInput {
	username: string;
	firstName: string;
	password: string;
	checkbox?: boolean;
}

export default function Login() {
	const router = useRouter();
	const { login } = useAuth();

	const [isBtnActive, setIsBtnActive] = useState(true);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		defaultValues: {
			username: '',
			password: '',
			checkbox: false,
		},
	});
	const onSubmit = (data: IFormInput) => {
		setIsBtnActive(false);
		login(
			data.username,
			data.password,
			() => {
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				router.push('/dashboard');
				setIsBtnActive(true);
			},
			() => {
				setIsBtnActive(true);
				alert('Incorrect Username or password');
			},
		);
	};

	return (
		<>
			<Head>
				<title>Admin</title>
				<meta name="description" content="SUN Login Page" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/logo.svg" />
			</Head>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<a
						href="/"
						className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					>
						<img
							className="w-8 h-8 mr-2"
							src="/logo.svg"
							alt="logo"
						/>
						SUN
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={handleSubmit(onSubmit)}
							>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your username
									</label>
									<input
										{...register('username', {
											required: 'Username is required',
										})}
										placeholder="John"
										className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
									/>

									{errors.username && (
										<span className="flex items-center justify-end m-2 text-red-500 transition-all translate-x-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5 mr-1"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
												/>
											</svg>
											{errors.username?.message}
										</span>
									)}
								</div>
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<input
										{...register('password', {
											required: 'Password is required',
											pattern: {
												value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
												message:
													'Please enter valid password',
											},
										})}
										type="password"
										placeholder="******"
										className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
									/>

									{errors.password && (
										<span className="flex items-center justify-end m-2 text-red-500 transition-all translate-x-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5 mr-1"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
												/>
											</svg>
											{errors.password?.message}
										</span>
									)}
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-start">
										{/* <div className="flex items-center h-5">
											<input
												{...register('checkbox')}
												type="checkbox"
												className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-700 dark:ring-offset-gray-800"
											/>
										</div> */}
										{/* <div className="ml-3 text-sm">
											<label
												htmlFor="remember"
												className="text-gray-500 dark:text-gray-300"
											>
												Remember me
											</label>
										</div> */}
									</div>
									<Button
										className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
										onClick={() => {}}
									>
										Forgot password?
									</Button>
								</div>
								<button
									type="submit"
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									{isBtnActive ? (
										'Sign in'
									) : (
										<div className="flex justify-center items-center">
											<div
												className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
												role="status"
											/>
										</div>
									)}
								</button>
								<span className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don&apos;t have an account?{' '}
									<p>
										Ask your university to create one for
										you
									</p>
								</span>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
