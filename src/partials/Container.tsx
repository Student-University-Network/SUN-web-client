interface IContainerProps {
    children: React.ReactNode
}

export default function Container(props: IContainerProps) {
    const { children } = props
    return (
        <div className="h-full mt-24 mb-20 ml-14 md:ml-64">
            {children}
        </div>
    )
}