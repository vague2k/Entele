import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, type = "button", ...props }, ref) => {
  return (
    <button
      type={type}
      className={twMerge(
        `inline-flex h-9 px-3 py-2 cursor-pointer items-center justify-center text-sm font-normal 
        bg-fill-100 hover:bg-fill-200 duration-300 rounded-lg gap-x-1 text-base-900
        transform transition-all active:scale-95 active:duration-75`,
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
