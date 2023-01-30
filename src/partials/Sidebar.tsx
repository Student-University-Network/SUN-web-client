/* eslint-disable no-console */
import Link from 'next/link';
import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

export default function Sidebar() {
    const router = useRouter();
    console.log(router.pathname);

    return (
        <div className="fixed left-0 z-10 flex flex-col h-full mt-16 overflow-hidden text-gray-900 transition-all duration-300 bg-white border-none shadow-md w-14 top-4 hover:w-64 md:w-64 dark:bg-gray-900">
            <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-auto">
                <ul className="flex flex-col py-4 space-y-1">
                    <li>
                        <Link className={`relative flex flex-row items-center pr-6 border-l-4 border-transparent h-11 focus:outline-none font-bold text-gray-500 dark:text-gray-400 hover:text-black hover:dark:text-white transition-colors duration-300 ${router.pathname === "/admin/dashboard" ? "border-primary-800 dark:border-primary-600 text-black dark:text-primary-100" : ""}`} href="/admin/dashboard" >
                            <span className="inline-flex items-center justify-center ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>

                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/programs" className={`relative flex flex-row items-center pr-6 border-l-4 border-transparent h-11 focus:outline-none font-bold text-gray-500 dark:text-gray-400 hover:text-black hover:dark:text-white transition-colors duration-300 ${router.pathname === "/admin/programs" ? "border-primary-800 dark:border-primary-600 text-black dark:text-primary-100" : "text-brand-darkblue"}`} >
                            <span className="inline-flex items-center justify-center ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                </svg>

                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Programs</span>
                            {/* <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">New</span> */}
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/courses" className={`relative flex flex-row items-center pr-6 border-l-4 border-transparent h-11 focus:outline-none font-bold text-gray-500 dark:text-gray-400 hover:text-black hover:dark:text-white transition-colors duration-300 ${router.pathname === "/admin/courses" ? "border-primary-800 dark:border-primary-600 text-black dark:text-primary-100" : "text-brand-darkblue"}`} >
                            <span className="inline-flex items-center justify-center ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                                </svg>

                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Courses</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/professors" className={`relative flex flex-row items-center pr-6 border-l-4 border-transparent h-11 focus:outline-none font-bold text-gray-500 dark:text-gray-400 hover:text-black hover:dark:text-white transition-colors duration-300 ${router.pathname === "/admin/professors" ? "border-primary-800 dark:border-primary-600 text-black dark:text-primary-100" : "text-brand-darkblue"}`} >
                            <span className="inline-flex items-center justify-center ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>

                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Professors</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/notifications" className={`relative flex flex-row items-center pr-6 border-l-4 border-transparent h-11 focus:outline-none font-bold text-gray-500 dark:text-gray-400 hover:text-black hover:dark:text-white transition-colors duration-300 ${router.pathname === "/admin/notifications" ? "border-primary-800 dark:border-primary-600 text-black dark:text-primary-100" : "text-brand-darkblue"}`} >
                            <span className="inline-flex items-center justify-center ml-4">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                                </svg>

                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Notifications</span>
                            <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
                        </Link>
                    </li>
                </ul>
                <ul className='flex flex-col py-4 space-y-1'>
                    <li>
                        <p className='mx-8 mb-4 font-normal text-gray-700 dark:text-gray-400'>Settings</p>
                    </li>
                    <li>
                        <Link className={`relative flex flex-row items-center pr-6 border-l-4 border-transparent h-11 focus:outline-none font-bold text-gray-500 dark:text-gray-400 hover:text-black hover:dark:text-white transition-colors duration-300 ${router.pathname === "/admin/profile" ? "border-primary-800 dark:border-primary-600 text-black dark:text-primary-100" : ""}`} href="/admin/profile" >
                            <span className="inline-flex items-center justify-center ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>

                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
                        </Link>
                    </li>
                </ul>
                <p className="hidden px-5 py-3 mt-auto mb-24 text-xs text-center text-primary-800 dark:text-primary-200 md:block">Copyright @2023</p>
            </div>
        </div>
    )
}