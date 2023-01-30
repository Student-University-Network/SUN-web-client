import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import ToggleTheme from 'src/Components/ToggleTheme';
import Link from 'next/link';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

function Navbar() {
    return (
        <div className='fixed z-20 flex items-center justify-between w-full h-20 px-8 transition-all duration-300 bg-white border-none shadow-md dark:bg-gray-800'>
            <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-yellow-500 dark:text-orange-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <h1 className='ml-2 text-2xl font-bold text-gray-900 dark:text-primary-300'>
                    SUN</h1>
            </div>

            <ul className='flex items-center'>

                <li className="p-3">
                    <ToggleTheme />
                </li>
                <li className='p-3'>
                    <Menu as='div' className='relative z-20 inline-block text-left'>
                        <div>
                            <Menu.Button className='flex items-center w-full p-2 border-none focus:outline-none '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="bottom-1 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                        >
                            <Menu.Items className='absolute right-0 z-10 w-24 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:shadow-gray-700 dark:bg-gray-900 lg:w-32 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                <div className='py-1'>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href='/nonePage'
                                                className={classNames(
                                                    active
                                                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                        : 'text-gray-700 dark:text-gray-200',
                                                    'block px-4 py-2 '
                                                )}
                                            >
                                                Settings
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (

                                            <a
                                                href='/'
                                                className={classNames(
                                                    active
                                                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                        : 'text-gray-700 dark:text-gray-200',
                                                    ' px-4 py-2 flex justify-between'
                                                )}
                                            >
                                                Sign Out <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                                </svg>

                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>

                            </Menu.Items>
                        </Transition>
                    </Menu>
                </li>
            </ul>
        </div>
    )

};

export default Navbar;