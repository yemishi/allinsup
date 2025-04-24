import { ButtonHTMLAttributes, ReactNode, memo } from "react";
import { cleanClasses } from "../../utils/helpers";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = memo(({ isLoading, children, ...props }) => {
  const { className = "", ...rest } = props;

  return (
    <button
      {...rest}
      className={cleanClasses(
        className,
        `${
          isLoading ? "animate-bounce pointer-events-none" : ""
        } p-3 rounded-xl bg-secondary-600 font-semibold disabled:grayscale active:scale-90 hover:scale-95 hover:brightness-110 transition-all`
      )}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
