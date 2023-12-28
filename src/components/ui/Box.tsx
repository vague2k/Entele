import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BoxProps {
  className?: string;
  children: ReactNode;
}

export default function Box({ className, children }: BoxProps) {
  return (
    <div
      className={twMerge(
        "bg-fill-50 rounded-md h-screen w-full p-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
