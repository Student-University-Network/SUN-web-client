interface IContainerProps {
	children: React.ReactNode;
}

export default function Container(props: IContainerProps) {
	const { children } = props;
	return (
		<div className="flex flex-auto flex-shrink-0 min-h-screen transition-colors duration-300">
			<div className="w-full h-full mt-24 mb-20 lg:ml-64">{children}</div>
		</div>
	);
}
