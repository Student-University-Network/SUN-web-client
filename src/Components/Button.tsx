/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */

import { FC } from "react"
// import styles from "../styles/Components.module.css"

interface ButtonProps {
    // type:string;
    className: string;
    onClick: () => void;
    btnType: string;
    children?: React.ReactNode;
}
/* eslint-disable react/button-has-type */
const Button: FC<ButtonProps> = ({ className, onClick, btnType, children }) => (
    <button
        type='button'
        className={`p-4 px-4 ${className} ${btnType}`}
        onClick={onClick}
    >{children}</button>
)

export default Button
