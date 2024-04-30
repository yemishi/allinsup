import { InputHTMLAttributes, forwardRef, useState } from "react";
import { parseLocalCurrency } from "../../utils/formatting";

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  value?: string | number;
  label?: string;
  flexRow?: true;
  error?: string;
  labelClass?: string;
  containerClass?: string;
  disabled?: boolean;
  asCurrency?: boolean;
}

const EditableText = forwardRef<HTMLInputElement, PropsType>((props, ref) => {
  const {
    id,
    placeholder,
    className,
    value,
    label,
    asCurrency,
    flexRow,
    labelClass,
    error,
    containerClass,
    disabled,
    type,
    onBlur,
    ...rest
  } = props;

  const [isInput, setIsInput] = useState(false);

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
      type={type || "text"}
      autoFocus
      value={value}
      placeholder={
        asCurrency ? parseLocalCurrency(Number(placeholder)) : placeholder
      }
      id={id}
      onBlur={(e) => {
        setIsInput(false);
        if (onBlur) onBlur(e);
      }}
      className={`${defaultFont} ${defaultSize} ${
        className ? className : ""
      } bg-transparent outline-none h-max w-max`}
      {...rest}
    />
  );

  const Component = () =>
    isInput && !disabled ? (
      Input
    ) : (
      <span
        className={`${defaultFont} ${defaultSize} ${
          className ? className : ""
        } `}
        onClick={() => setIsInput(true)}
      >
        {asCurrency
          ? parseLocalCurrency(Number(value)) ||
            parseLocalCurrency(Number(placeholder))
          : value || placeholder}
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
