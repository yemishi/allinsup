import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  disableBounce?: boolean;
}

export default function Button({
  children,
  disableBounce,
  ...props
}: ButtonProps) {
  const { className, ...rest } = props;
  const defaultBg = className?.includes("bg-")
    ? ""
    : "bg-white text-primary-600  bg-opacity-75";
  const defaultPadding = className?.includes("p-") ? "" : "p-3";
  const defaultRounded = className?.includes("rounded") ? "" : "rounded-xl";
  const defaultFont = className?.includes("font-") ? "" : "font-semibold";

  return (
    <button
      {...rest}
      className={`${
        className ? className : ""
      } ${defaultFont} ${defaultPadding} ${defaultRounded} ${defaultBg} ${
        disableBounce ? "" : "active:scale-95"
      } disabled:pointer-events-none disabled:animate-pulse hover:opacity-70 duration-200`}
    >
      {children}
    </button>
  );
}
