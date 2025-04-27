import { FormHTMLAttributes, ReactNode, useState } from "react";
import { Button, Input } from "../../ui";
import useForm, { FormField } from "../../hooks/useForm";
import { cleanClasses } from "../../utils/helpers";

export type InputsType = Record<string, InputType>;
interface InputType extends FormField {
  label: string;
  isPassword?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

interface PropsType<T> extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  inputs: InputsType;
  onSubmit: (values: T) => void;
  isSuccess?: boolean;
  children?: ReactNode;
  submitMessage?: string;
  disabled?: boolean;
  submitStyle?: string;
}

export default function Form<T>({
  inputs,
  disabled,
  onSubmit,
  isSuccess,
  children,
  submitStyle = "",
  submitMessage,
  ...props
}: PropsType<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const { className = "", ...rest } = props;
  const { errors, onChange, values, validateAll } = useForm(inputs);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    if (!validateAll()) return;
    setIsLoading(true);
    onSubmit(values as T);
    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className={cleanClasses(className, "gap-3 md:gap-5 p-4 flex flex-col")} {...rest}>
      {Object.entries(inputs).map(([name, { label, inputProps, isPassword }], i) => {
        return (
          <Input
            isLoading={isLoading}
            key={`${name}_${i}`}
            label={label}
            placeholder={inputProps?.placeholder || label}
            isPassword={isPassword}
            value={(values as Record<string, any>)[name]}
            error={errors[name] as string}
            name={name}
            onChange={onChange}
            {...inputProps}
          />
        );
      })}
      <Button disabled={disabled} isLoading={isLoading} className={`${submitStyle} my-5 self-center`} type="submit">
        {submitMessage || "Confirm"}
      </Button>
      {children}
    </form>
  );
}
4;
