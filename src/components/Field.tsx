import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(({ className, type, label, ...props }, ref) => {
  return (
    <>
      <label className="ml-1">{label}</label>
      <input
        type={type}
        className={twMerge(`
          flex
          w-full
          rounded-lg
          bg-neutral-200
          border-2
          border-neutral-300
          p-2
          text-sm
          focus:outline-blue-600
          focus:outline-offset-1
        `, className)}
        ref={ref}
        {...props}
      />
    </>
  );
});

Field.displayName = "Field";

export default Field;

