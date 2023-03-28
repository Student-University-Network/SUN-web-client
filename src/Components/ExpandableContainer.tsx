import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { IconButton } from './Button';

interface IToggleItem {
	title: string;
	content: React.ReactNode;
	key: string;
}

function ExpandableContainer({ title, content, key }: IToggleItem) {
	const [toggleElement, setToggleElement] = useState(true);

	return (
		<div className="shadow-md rounded-md overflow-hidden" key={key}>
			<div className="flex justify-between items-center space-x-10 p-2 bg-gray-200 dark:bg-gray-700">
				<span className="text-l pl-4">{title}</span>
				<IconButton
					type="button"
					leadingIcon={
						toggleElement ? (
							<ChevronUpIcon
								className="w-4 h-4"
								strokeWidth={2}
							/>
						) : (
							<ChevronDownIcon
								className="w-4 h-4"
								strokeWidth={2}
							/>
						)
					}
					onClick={() => {
						setToggleElement(!toggleElement);
					}}
				/>
			</div>
			{toggleElement ? <div className="p-4">{content}</div> : null}
		</div>
	);
}

export default ExpandableContainer;
