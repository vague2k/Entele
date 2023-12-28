import React from "react";
import { twMerge } from "tailwind-merge";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        `flex h-9 w-full rounded-md border border-fill-200/50 bg-transparent 
        px-3 py-1 text-sm text-base-900 shadow-sm transition-colors 
        placeholder:text-base-400 focus-visible:outline-none focus-visible:ring-1 
        focus-visible:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export default Input;
