/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Head from 'next/head';

import { useAuth } from 'src/context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { ERROR, useAlert } from 'src/Components/Alert';

interface IFormInput {
	username: string;
	firstName: string;
	password: string;
	checkbox?: boolean;
}

export default function Login() {
	const router = useRouter();
	const { login } = useAuth();
	const { showAlert } = useAlert();

	const [isBtnActive, setIsBtnActive] = useState(true);
	const [showPassword, setShowPassword] = useState(false);

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
				showAlert(ERROR, 'Username or password incorrect', true);
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
			<section className="bg-gray-50 dark:bg-gray-900 min-h-full ">
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
										placeholder="username"
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
										className="block mb-2 text-sm font-medium flex-1 text-gray-900 dark:text-white"
									>
										Password
									</label>
									<div className="flex items-center">
										<input
											{...register('password', {
												required:
													'Password is required',
												pattern: {
													value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
													message:
														'Please enter valid password',
												},
											})}
											type={
												showPassword
													? 'text'
													: 'password'
											}
											placeholder={
												showPassword
													? 'password'
													: '********'
											}
											className={`flex-1 bg-gray-50 border border-r-0 w-full border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
										/>
										<div
											className="p-2.5 sm:p-2 bg-gray-50 dark:bg-gray-700 rounded-r-lg border border-l-0
										 border-gray-300 dark:border-gray-600"
											onClick={() =>
												setShowPassword(!showPassword)
											}
											role="button"
											tabIndex={0}
											// onKeyUp={}
										>
											{showPassword ? (
												<EyeSlashIcon
													className="w-6 h-6"
													strokeWidth={2}
												/>
											) : (
												<EyeIcon
													className="w-6 h-6"
													strokeWidth={2}
												/>
											)}
										</div>
									</div>

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
									{/* TODO: add forget password url */}
									<Link
										href="/"
										className="text-sm text-primary-700 hover:bg-primary-100 rounded-lg p-2 "
									>
										Forgot password?
									</Link>
								</div>
								<button
									type="submit"
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									{isBtnActive ? (
										'Sign in'
									) : (
										<div className="flex justify-center items-center">
											<div role="status">
												<svg
													aria-hidden="true"
													className="w-5 h-5 text-gray-200 animate-spin fill-primary-900"
													viewBox="0 0 100 101"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
														fill="currentColor"
													/>
													<path
														d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
														fill="currentFill"
													/>
												</svg>
												<span className="sr-only">
													Loading...
												</span>
											</div>
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
