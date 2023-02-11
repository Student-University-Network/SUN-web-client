/* eslint-disable react/require-default-props */
interface IPageMetric {
	label: string;
	value: number;
	logo: React.ReactNode;
	className?: string;
}

export default function PageMetric({
	label,
	value,
	logo,
	className = '',
}: IPageMetric) {
	return (
		<div
			className={`${className} flex items-center justify-between p-3 font-medium text-primary-800 dark:text-white border-2 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600 group`}
		>
			<div className="flex items-center justify-center pl-2">
				<p className="text-xl">{label} : </p>
				<p className="text-2xl">{value}</p>
			</div>
			<div className="flex items-center justify-center transition-all duration-300 transform bg-white rounded-full w-14 h-14 group-hover:rotate-12">
				{logo}
			</div>
		</div>
	);
}
