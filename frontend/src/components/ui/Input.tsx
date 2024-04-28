import { InputHTMLAttributes, forwardRef, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  info?: string;
  isPassword?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, icon, className, info, error, id, isPassword, ...rest } =
    props;

  const [isPass, setIsPass] = useState<boolean>(true);
  const PassIcon = isPass ? FaEyeSlash : IoEyeSharp;
  const checkType = isPassword ? (isPass ? "password" : "text") : undefined;

  return (
    <span
      className={`${
        className ? className : ""
      }  flex flex-col gap-1 font-kanit text-left `}
    >
      <span>
        <label
          className="text-gray-200 lg:text-lg"
          htmlFor={id || rest.name}
          aria-label={rest.name}
        >
          {label}
        </label>
        {info && <p className="text-gray-400 text-sm">{info}</p>}
      </span>

      <span
        className={`text-lg relative text-white rounded-md w-full
       ${icon && "relative"}`}
      >
        <input
          type={checkType}
          id={id || rest.name}
          className={`${className ? className : ""} ${
            error ? "border-red-500" : "border-transparent"
          } border w-full text-white text-opacity-50 duration-150 bg-primary-400 focus:bg-primary-200 p-2 lg:py-3 rounded-md outline-none focus:text-opacity-100 
           placeholder:text-white placeholder:text-opacity-50 focus:placeholder:text-opacity-90 lg:text-xl disabled:pointer-events-none disabled:animate-pulse`}
          ref={ref}
          {...rest}
        />
        {icon}
        {isPassword && (
          <span
            onClick={() => setIsPass(!isPass)}
            className="absolute top-2/4 -translate-y-2/4 right-2 cursor-pointer"
          >
            <PassIcon className="w-6 h-6" />
          </span>
        )}
      </span>
      {error && (
        <span className="ml-1 text-sm text-red-500 md:text-base">{error}</span>
      )}
    </span>
  );
});

Input.displayName = "Input";

export default Input;
