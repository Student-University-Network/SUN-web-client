import { useTheme } from 'next-themes';
import Button from './Button';

export default function ToggleTheme() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex items-center justify-between h-16 ">
			<button
				type="button"
				className="p-0 text-primary-600"
				onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			>
				{theme === 'dark' ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
							clipRule="evenodd"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
					</svg>
				)}
			</button>
		</div>
	);
}

// eslint-disable-next-line no-lone-blocks
{
	/*
<div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center justify-between p-3 font-medium text-white border-b-4 rounded-md shadow-lg bg-primary-500 border-primary-600 dark:bg-gray-800 dark:border-gray-600 group">
                            <div className="flex items-center justify-center transition-all duration-300 transform bg-white rounded-full w-14 h-14 group-hover:rotate-12">
                                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform duration-500 ease-in-out transform stroke-current text-primary-800 dark:text-gray-800"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl">1,257</p>
                                <p>Visitors</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 font-medium text-white border-b-4 rounded-md shadow-lg bg-primary-500 border-primary-600 dark:bg-gray-800 dark:border-gray-600 group">
                            <div className="flex items-center justify-center transition-all duration-300 transform bg-white rounded-full w-14 h-14 group-hover:rotate-12">
                                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform duration-500 ease-in-out transform stroke-current text-primary-800 dark:text-gray-800"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl">557</p>
                                <p>Orders</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 font-medium text-white border-b-4 rounded-md shadow-lg bg-primary-500 border-primary-600 dark:bg-gray-800 dark:border-gray-600 group">
                            <div className="flex items-center justify-center transition-all duration-300 transform bg-white rounded-full w-14 h-14 group-hover:rotate-12">
                                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform duration-500 ease-in-out transform stroke-current text-primary-800 dark:text-gray-800"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl">$11,257</p>
                                <p>Sales</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 font-medium text-white border-b-4 rounded-md shadow-lg bg-primary-500 border-primary-600 dark:bg-gray-800 dark:border-gray-600 group">
                            <div className="flex items-center justify-center transition-all duration-300 transform bg-white rounded-full w-14 h-14 group-hover:rotate-12">
                                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform duration-500 ease-in-out transform stroke-current text-primary-800 dark:text-gray-800"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl">$75,257</p>
                                <p>Balances</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">


                        <div className="relative flex flex-col w-full min-w-0 mb-4 break-words rounded shadow-lg lg:mb-0 bg-gray-50 dark:bg-gray-800">
                            <div className="px-0 mb-0 border-0 rounded-t">
                                <div className="flex flex-wrap items-center px-4 py-2">
                                    <div className="relative flex-1 flex-grow w-full max-w-full">
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">Social Traffic</h3>
                                    </div>
                                    <div className="relative flex-1 flex-grow w-full max-w-full text-right">
                                        <button className="px-3 py-1 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded outline-none bg-primary-500 dark:bg-gray-100 active:bg-primary-600 dark:text-gray-800 dark:active:text-gray-700 focus:outline-none" type="button">See all</button>
                                    </div>
                                </div>
                                <div className="block w-full overflow-x-auto">
                                    <table className="items-center w-full bg-transparent border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-100 border border-l-0 border-r-0 border-gray-200 border-solid dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 whitespace-nowrap">Referral</th>
                                                <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-100 border border-l-0 border-r-0 border-gray-200 border-solid dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 whitespace-nowrap">Visitors</th>
                                                <th className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-100 border border-l-0 border-r-0 border-gray-200 border-solid dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 whitespace-nowrap min-w-140-px">Completion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-gray-700 dark:text-gray-100">
                                                <th className="p-4 px-4 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">Facebook</th>
                                                <td className="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">5,480</td>
                                                <td className="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">70%</span>
                                                        <div className="relative w-full">
                                                            <div className="flex h-2 overflow-hidden text-xs rounded bg-primary-200">
                                                                <div className="flex flex-col justify-center w-3/4 text-center text-white shadow-none bg-primary-600 whitespace-nowrap" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="text-gray-700 dark:text-gray-100">
                                                <th className="p-4 px-4 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">Twitter</th>
                                                <td className="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">3,380</td>
                                                <td className="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">40%</span>
                                                        <div className="relative w-full">
                                                            <div className="flex h-2 overflow-hidden text-xs bg-blue-200 rounded">
                                                                <div className="flex flex-col justify-center w-2/4 text-center text-white bg-blue-500 shadow-none whitespace-nowrap" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="text-gray-700 dark:text-gray-100">
                                                <th className="p-4 px-4 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">Instagram</th>
                                                <td className="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">4,105</td>
                                                <td className="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">45%</span>
                                                        <div className="relative w-full">
                                                            <div className="flex h-2 overflow-hidden text-xs bg-pink-200 rounded">
                                                                <div className="flex flex-col justify-center w-2/4 text-center text-white bg-pink-500 shadow-none whitespace-nowrap" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="text-gray-700 dark:text-gray-100">
                                                <th className="p-4 px-4 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">Google</th>
                                                <td className="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">4,985</td>
                                                <td className="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">60%</span>
                                                        <div className="relative w-full">
                                                            <div className="flex h-2 overflow-hidden text-xs bg-red-200 rounded">
                                                                <div className="flex flex-col justify-center w-4/6 text-center text-white bg-red-500 shadow-none whitespace-nowrap" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="text-gray-700 dark:text-gray-100">
                                                <th className="p-4 px-4 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">Linkedin</th>
                                                <td className="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">2,250</td>
                                                <td className="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">30%</span>
                                                        <div className="relative w-full">
                                                            <div className="flex h-2 overflow-hidden text-xs bg-blue-200 rounded">
                                                                <div className="flex-col justify-center text-center text-white bg-blue-700 shadow-none w-1/3flex whitespace-nowrap" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex flex-col w-full min-w-0 break-words rounded shadow-lg bg-gray-50 dark:bg-gray-800">
                            <div className="px-0 mb-0 border-0 rounded-t">
                                <div className="flex flex-wrap items-center px-4 py-2">
                                    <div className="relative flex-1 flex-grow w-full max-w-full">
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">Recent Activities</h3>
                                    </div>
                                    <div className="relative flex-1 flex-grow w-full max-w-full text-right">
                                        <button className="px-3 py-1 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded outline-none bg-primary-500 dark:bg-gray-100 active:bg-primary-600 dark:text-gray-800 dark:active:text-gray-700 focus:outline-none" type="button">See all</button>
                                    </div>
                                </div>
                                <div className="block w-full">
                                    <div className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-100 border border-l-0 border-r-0 border-gray-200 border-solid dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 whitespace-nowrap">
                                        Today
                                    </div>
                                    <ul className="my-1">
                                        <li className="flex px-4">
                                            <div className="flex-shrink-0 my-2 mr-3 bg-indigo-500 rounded-full w-9 h-9">
                                                <svg className="fill-current w-9 h-9 text-indigo-50" viewBox="0 0 36 36"><path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" /></svg>
                                            </div>
                                            <div className="flex items-center flex-grow py-2 text-sm text-gray-600 border-b border-gray-100 dark:border-gray-400 dark:text-gray-100">
                                                <div className="flex items-center justify-between flex-grow">
                                                    <div className="self-center">
                                                        <a className="font-medium text-gray-800 outline-none hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100" href="#0" >Nick Mark</a> mentioned <a className="font-medium text-gray-800 outline-none dark:text-gray-50 dark:hover:text-gray-100" href="#0">Sara Smith</a> in a new post
                                                    </div>
                                                    <div className="flex-shrink-0 ml-2">
                                                        <a className="flex items-center font-medium outline-none text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500" href="#0" >
                                                            View<span><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="transition-transform duration-500 ease-in-out transform"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="flex px-4">
                                            <div className="flex-shrink-0 my-2 mr-3 bg-red-500 rounded-full w-9 h-9">
                                                <svg className="fill-current w-9 h-9 text-red-50" viewBox="0 0 36 36"><path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" /></svg>
                                            </div>
                                            <div className="flex items-center flex-grow py-2 text-sm text-gray-600 border-gray-100 dark:text-gray-50">
                                                <div className="flex items-center justify-between flex-grow">
                                                    <div className="self-center">
                                                        The post <a className="font-medium text-gray-800 dark:text-gray-50 dark:hover:text-gray-100" href="#0" >Post Name</a> was removed by <a className="font-medium text-gray-800 outline-none hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100" href="#0">Nick Mark</a>
                                                    </div>
                                                    <div className="flex-shrink-0 ml-2">
                                                        <a className="flex items-center font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500" href="#0">
                                                            View<span><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="transition-transform duration-500 ease-in-out transform"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-100 border border-l-0 border-r-0 border-gray-200 border-solid dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 whitespace-nowrap">
                                        Yesterday
                                    </div>
                                    <ul className="my-1">
                                        <li className="flex px-4">
                                            <div className="flex-shrink-0 my-2 mr-3 bg-green-500 rounded-full w-9 h-9">
                                                <svg className="fill-current w-9 h-9 text-light-blue-50" viewBox="0 0 36 36"><path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z" /></svg>
                                            </div>
                                            <div className="flex items-center flex-grow py-2 text-sm text-gray-600 border-gray-100 dark:text-gray-50">
                                                <div className="flex items-center justify-between flex-grow">
                                                    <div className="self-center">
                                                        <a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100" href="#0">240+</a> users have subscribed to <a className="font-medium text-gray-800 dark:text-gray-50 dark:hover:text-gray-100" href="#0" >Newsletter #1</a>
                                                    </div>
                                                    <div className="flex-shrink-0 ml-2">
                                                        <a className="flex items-center font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500" href="#0">
                                                            View<span><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="transition-transform duration-500 ease-in-out transform"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 p-4 text-black md:grid-cols-2 xl:grid-cols-3 dark:text-white">
                        <div className="md:col-span-2 xl:col-span-3">
                            <h3 className="text-lg font-semibold">Task summaries of recent sprints</h3>
                        </div>
                        <div className="md:col-span-2 xl:col-span-1">
                            <div className="p-3 bg-gray-200 rounded dark:bg-gray-800">
                                <div className="flex justify-between py-1 text-black dark:text-white">
                                    <h3 className="text-sm font-semibold">Tasks in TO DO</h3>
                                    <svg className="h-4 text-gray-600 cursor-pointer fill-current dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
                                </div>
                                <div className="mt-2 text-sm text-black dark:text-gray-50">
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">Delete all references from the wiki</div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">Remove analytics code</div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                                        Do a mobile first layout
                                        <div className="flex items-start justify-between mt-2 ml-2 text-gray-500 dark:text-gray-200">
                                            <span className="flex items-center text-xs">
                                                <svg className="h-4 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" /></svg>
                                                3/5
                                            </span>
                                            <img src="https://i.imgur.com/OZaT7jl.png" className="rounded-full" alt="avatar" />
                                        </div>
                                    </div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">Check the meta tags</div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                                        Think more tasks for this example
                                        <div className="flex items-start justify-between mt-2 ml-2 text-gray-500 dark:text-gray-200">
                                            <span className="flex items-center text-xs">
                                                <svg className="h-4 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" /></svg>
                                                0/3
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-gray-600 dark:text-gray-400">Add a card...</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="p-3 bg-gray-200 rounded dark:bg-gray-800">
                                <div className="flex justify-between py-1 text-black dark:text-white">
                                    <h3 className="text-sm font-semibold">Tasks in DEVELOPMENT</h3>
                                    <svg className="h-4 text-gray-600 cursor-pointer fill-current dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
                                </div>
                                <div className="mt-2 text-sm text-black dark:text-gray-50">
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">Delete all references from the wiki</div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">Remove analytics code</div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                                        Do a mobile first layout
                                        <div className="flex items-start justify-between mt-2 ml-2 text-xs text-white">
                                            <span className="flex items-center p-1 text-xs bg-pink-600 rounded">
                                                <svg className="h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" /></svg>
                                                2
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">Check the meta tags</div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                                        Think more tasks for this example
                                        <div className="flex items-start justify-between mt-2 ml-2 text-gray-500">
                                            <span className="flex items-center text-xs">
                                                <svg className="h-4 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" /></svg>
                                                0/3
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-gray-600 dark:text-gray-400">Add a card...</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="p-3 bg-gray-200 rounded dark:bg-gray-800">
                                <div className="flex justify-between py-1 text-black dark:text-white">
                                    <h3 className="text-sm font-semibold">Tasks in QA</h3>
                                    <svg className="h-4 text-gray-600 cursor-pointer fill-current dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
                                </div>
                                <div className="mt-2 text-sm text-black dark:text-gray-50">
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">Delete all references from the wiki</div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">Remove analytics code</div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">Do a mobile first layout</div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">Check the meta tags</div>
                                    <div className="p-2 mt-1 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                                        Think more tasks for this example
                                        <div className="flex items-start justify-between mt-2 ml-2 text-gray-500 dark:text-gray-200">
                                            <span className="flex items-center text-xs">
                                                <svg className="h-4 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" /></svg>
                                                0/3
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-gray-600 dark:text-gray-400">Add a card...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-4 mt-4">
                        <div className="w-full overflow-hidden rounded-lg shadow-xs">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                            <th className="px-4 py-3">Client</th>
                                            <th className="px-4 py-3">Amount</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                        <tr className="text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-400">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                        <img className="object-cover w-full h-full rounded-full" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="" loading="lazy" />
                                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">Hans Burger</p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">10x Developer</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">$855.85</td>
                                            <td className="px-4 py-3 text-xs">
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"> Approved </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">15-01-2021</td>
                                        </tr>
                                        <tr className="text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-400">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                        <img className="object-cover w-full h-full rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;facepad=3&amp;fit=facearea&amp;s=707b9c33066bf8808c934c8ab394dff6" alt="" loading="lazy" />
                                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">Jolina Angelie</p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">Unemployed</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">$369.75</td>
                                            <td className="px-4 py-3 text-xs">
                                                <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full"> Pending </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">23-03-2021</td>
                                        </tr>
                                        <tr className="text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-400">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                        <img className="object-cover w-full h-full rounded-full" src="https://images.unsplash.com/photo-1502720705749-871143f0e671?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;s=b8377ca9f985d80264279f277f3a67f5" alt="" loading="lazy" />
                                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">Dave Li</p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">Influencer</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">$775.45</td>
                                            <td className="px-4 py-3 text-xs">
                                                <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700"> Expired </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">09-02-2021</td>
                                        </tr>
                                        <tr className="text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-400">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                        <img className="object-cover w-full h-full rounded-full" src="https://images.unsplash.com/photo-1551006917-3b4c078c47c9?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="" loading="lazy" />
                                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">Rulia Joberts</p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">Actress</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">$1276.75</td>
                                            <td className="px-4 py-3 text-xs">
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"> Approved </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">17-04-2021</td>
                                        </tr>
                                        <tr className="text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-400">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                        <img className="object-cover w-full h-full rounded-full" src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="" loading="lazy" />
                                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">Hitney Wouston</p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">Singer</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">$863.45</td>
                                            <td className="px-4 py-3 text-xs">
                                                <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700"> Denied </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">11-01-2021</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                                <span className="flex items-center col-span-3"> Showing 21-30 of 100 </span>
                                <span className="col-span-2" />
                                <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                                    <nav aria-label="Table navigation">
                                        <ul className="inline-flex items-center">
                                            <li>
                                                <button type="button" className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
                                                    <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                        <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">1</button>
                                            </li>
                                            <li>
                                                <button type="button" className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">2</button>
                                            </li>
                                            <li>
                                                <button type="button" className="px-3 py-1 text-white transition-colors duration-150 border border-r-0 rounded-md bg-primary-600 border-primary-600 dark:text-gray-800 dark:bg-gray-100 dark:border-gray-100 focus:outline-none focus:shadow-outline-purple">3</button>
                                            </li>
                                            <li>
                                                <button type="button" className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">4</button>
                                            </li>
                                            <li>
                                                <span className="px-3 py-1">...</span>
                                            </li>
                                            <li>
                                                <button type='button' className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">8</button>
                                            </li>
                                            <li>
                                                <button type='button' className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">9</button>
                                            </li>
                                            <li>
                                                <button type='button' className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
                                                    <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mx-4 mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                                <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl dark:text-white">Get in touch</h1>
                                <p className="mt-2 text-lg font-medium text-gray-600 text-normal sm:text-2xl dark:text-gray-400">Fill in the form to submit any query</p>

                                <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div className="w-40 ml-4 font-semibold tracking-wide text-md">Dhaka, Street, State, Postal Code</div>
                                </div>

                                <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div className="w-40 ml-4 font-semibold tracking-wide text-md">+880 1234567890</div>
                                </div>

                                <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div className="w-40 ml-4 font-semibold tracking-wide text-md">info@demo.com</div>
                                </div>
                            </div>
                            <form className="flex flex-col justify-center p-6">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="hidden">Full Name</label>
                                    <input type="name" name="name" id="name" placeholder="Full Name" className="px-3 py-3 mt-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded-lg w-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50 focus:border-primary-500 focus:outline-none" />
                                </div>

                                <div className="flex flex-col mt-2">
                                    <label htmlFor="email" className="hidden">Email</label>
                                    <input type="email" name="email" id="email" placeholder="Email" className="px-3 py-3 mt-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded-lg w-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50 focus:border-primary-500 focus:outline-none" />
                                </div>

                                <div className="flex flex-col mt-2">
                                    <label htmlFor="tel" className="hidden">Number</label>
                                    <input type="tel" name="tel" id="tel" placeholder="Telephone Number" className="px-3 py-3 mt-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded-lg w-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50 focus:border-primary-500 focus:outline-none" />
                                </div>

                                <button type="submit" className="px-6 py-3 mt-4 font-bold text-white transition duration-300 ease-in-out rounded-lg bg-primary-600 md:w-32 dark:bg-gray-100 dark:text-gray-800 hover:bg-primary-500 dark:hover:bg-gray-200">Submit</button>
                            </form>
                        </div>
                    </div>
 
            */
}
