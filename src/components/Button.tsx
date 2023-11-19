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
        `
            flex 
            cursor-pointer 
            items-center 
            font-medium 
            bg-neutral-100 
            hover:bg-neutral-200
            duration-300
            rounded-lg 
            p-2 
            gap-x-2
            `,
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
