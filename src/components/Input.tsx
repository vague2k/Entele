import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        `
                flex 
                w-full 
                rounded-lg
                bg-transparent
                border-2 
                border-fill-200
                p-2
                text-sm 
                placeholder-fill-400
                text-base-950
                `,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
