import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`bg-surface border border-line rounded-2xl p-5 md:p-6 transition-colors duration-150 hover:border-ink-subtle ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
