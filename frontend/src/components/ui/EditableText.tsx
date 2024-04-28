import { InputHTMLAttributes, forwardRef, useState } from "react";

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  value?: string | number;
  label?: string;
  flexRow?: true;
  error?: string;
  labelClass?: string;
  containerClass?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

const EditableText = forwardRef<HTMLInputElement, PropsType>((props, ref) => {
  const [isInput, setIsInput] = useState(false);
  const {
    id,
    placeholder,
    className,
    value,
    label,
    flexRow,
    labelClass,
    error,
    containerClass,
    autoFocus,
    disabled,
    ...rest
  } = props;
  const defaultFont = className?.includes("font-")
    ? ""
    : "font-lato font-semibold";
  const defaultSize =
    className?.includes("w-") || className?.includes("h-")
      ? ""
      : "w-full h-full";
  const Input = (
    <input
      ref={ref}
      type="text"
      placeholder={placeholder}
      autoFocus={autoFocus !== undefined ? autoFocus : true}
      value={value}
      id={id}
      onBlur={() => setIsInput(false)}
      className={`${defaultFont} ${defaultSize} ${
        className ? className : ""
      } bg-transparent outline-none`}
      {...rest}
    />
  );
  const Component = () =>
    !isInput && !disabled ? (
      Input
    ) : (
      <span
        className={`${defaultFont} ${defaultSize} ${
          className ? className : ""
        }`}
        onClick={() => setIsInput(true)}
      >
        {value || placeholder}
      </span>
    );
  return (
    <div
      ref={ref}
      className={`space-y-1 ${containerClass ? containerClass : ""}`}
    >
      <div
        className={`flex ${
          flexRow ? "flex-row" : "flex-col"
        } gap-1 disabled:animate-pulse disabled:pointer-events-none`}
      >
        {label && (
          <label
            onClick={() => setIsInput(true)}
            className={labelClass}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <Component />
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
});

export default EditableText;
