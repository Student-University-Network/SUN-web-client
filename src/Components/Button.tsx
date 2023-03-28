/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/require-default-props */
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
	leadingIcon?: React.ReactNode;
	trailingIcon?: React.ReactNode;
	label?: string;
}

function Button({
	className = '',
	onClick,
	label,
	leadingIcon,
	trailingIcon,
}: ButtonProps) {
	return (
		<button type="button" className={`btn ${className}`} onClick={onClick}>
			<div>{leadingIcon}</div>
			<div>{label}</div>
			<div>{trailingIcon}</div>
		</button>
	);
}
function IconButton({ className = '', onClick, leadingIcon }: ButtonProps) {
	return (
		<button
			type="button"
			className={`btn inline-flex mx-1 w-fit ${className}`}
			onClick={onClick}
		>
			<div>{leadingIcon}</div>
		</button>
	);
}
export { Button, IconButton };
