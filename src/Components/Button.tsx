/* eslint-disable react/require-default-props */
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
	leadingIcon?: React.ReactNode;
	trailingIcon?: React.ReactNode;
	label: string;
}

export default function Button({
	className = '',
	onClick,
	label,
	leadingIcon,
	trailingIcon,
}: ButtonProps) {
	return (
		<button
			type="button"
			className={`btn hover:bg-primary-600 active:bg-primary-700 active:ring active:ring-primary-300  ${className}`}
			onClick={onClick}
		>
			<div>{leadingIcon}</div>
			<div className="flex-1">{label}</div>
			<div>{trailingIcon}</div>
		</button>
	);
}
