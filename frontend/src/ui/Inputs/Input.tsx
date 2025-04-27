import { InputHTMLAttributes, forwardRef, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { cleanClasses } from "../../utils/helpers";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isLoading?: boolean;
  isPassword?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className = "", label, error, id, isPassword, isLoading, placeholder, type: selectedType, ...rest } = props;
  const [isPass, setIsPass] = useState<boolean>(true);
  const PassIcon = isPass ? FaEyeSlash : IoEyeSharp;

  const hasValue = !!rest.value;
  const type = isPassword ? (isPass ? "password" : "text") : selectedType || "text";
  return (
    <div
      className={cleanClasses(
        className,
        `flex flex-col gap-1 relative border-b-2 p-2 group focus-within:border-secondary-400 ${
          hasValue ? "border-blue-300" : ""
        } ${error ? "!text-red-500 !border-red-500" : ""} ${isLoading ? "pointer-events-none animate-bounce" : ""}`
      )}
    >
      <label
        className={`lg:text-lg origin-left  absolute left-2 group-focus-within:text-secondary-400 duration-150 bottom-2 ${
          hasValue ? "-translate-y-[85%] -translate-x-2 scale-[.78] font-semibold" : ""
        } ${!error && hasValue ? "text-blue-300" : ""}`}
        htmlFor={id || rest.name}
        aria-label={rest.name}
      >
        {label}
      </label>

      <input type={type} id={id || rest.name} className="outline-none bg-transparent w-full" {...rest} ref={ref} />

      {isPassword && (
        <span onClick={() => setIsPass(!isPass)} className="absolute top-2/4 -translate-y-2/4 right-2 cursor-pointer">
          <PassIcon className="w-6 h-6" />
        </span>
      )}

      {error && <span className="text-sm absolute -top-3 right-0">{error || "Something went wrong here."}</span>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
