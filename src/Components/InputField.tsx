import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	className: string;
	label: string;
}

function InputField({ ...props }: InputFieldProps) {
	const { className, type, name, label, placeholder } = props;
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
				id={name}
				placeholder={placeholder}
				className=" w-full p-3 mt-2 font-semibold text-gray-800
            bg-white border border-gray-400 rounded-lg dark:bg-gray-800
             dark:border-gray-700 dark:text-gray-50 focus:border-primary-800
              dark:focus:border-primary-500 focus:outline-none"
			/>
		</div>
	);
}

export default InputField;
