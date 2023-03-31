/* eslint-disable react/require-default-props */
import { InputHTMLAttributes, MutableRefObject } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	label?: string;
}

function InputField({ ...props }: InputFieldProps) {
	const {
		className = '',
		type,
		name,
		label = '',
		placeholder,
		onChange,
		readOnly,
		onFocus,
		value,
		...rest
	} = props;
	return (
		<div className={className}>
			<label
				htmlFor={name}
				className="block text-base font-medium text-primary-800 dark:text-primary-500 "
			>
				{label}
			</label>
			<input
				type={type}
				name={name}
				value={value}
				id={name}
				placeholder={placeholder}
				className={`input-field ${className}`}
				onChange={onChange}
				readOnly={readOnly}
				onFocus={onFocus}
				{...rest}
			/>
		</div>
	);
}

export default InputField;
