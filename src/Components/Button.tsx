

interface ButtonProps {
    className: string;
    onClick: () => void;
    children: undefined | React.ReactNode;
}

function Button(props: ButtonProps) {
    const { className, onClick, children } = props;
    return (<button
        type='button'
        className={`p-4 px-4 ${className}`}
        onClick={onClick}
    >{children}</button>)
}

export default Button
