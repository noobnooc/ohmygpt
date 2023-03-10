import { ReactNode, type CSSProperties } from "react";
import classNames from "classnames";

export default function Card({
  children,
  className,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={classNames(
        "isolate rounded-xl border border-gray-600/10 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
