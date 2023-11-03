import type { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface BoxProps {
    className?: string
    children: ReactNode
}

const Box: React.FC<BoxProps> = ({
    className,
    children
}) => {
    return (
        <div className={twMerge('bg-neutral-200 rounded-xl h-fit w-full p-3', className)}>
            {children}
        </div>
    ) 
}

export default Box
