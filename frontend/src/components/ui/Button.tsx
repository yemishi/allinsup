import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cleanClasses } from "../../utils/helpers";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  disableBounce?: boolean;
}

const Button: React.FC<ButtonProps> = React.memo(({ children, disableBounce, ...props }) => {
  const { className, ...rest } = props;

  return (
    <button
      {...rest}
      className={cleanClasses(
        className,
        `${
          disableBounce ? "" : "active:scale-95"
        } p-3 rounded-xl font-semibold disabled:pointer-events-none disabled:animate-pulse hover:opacity-70 duration-200`
      )}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
