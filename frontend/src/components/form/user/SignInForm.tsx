import { HTMLAttributes, useState } from "react";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCloseSharp } from "react-icons/io5";
import { updateToken } from "../../../services/axios.config";
import Input from "../../ui/Input";
import Button from "../../ui/Button,";
import axiosRequest  from "../../../services/axios.config";
import { toast } from "react-toastify";


interface FormProps extends HTMLAttributes<HTMLFormElement> {
  onClose: () => void;
  openSignUp: () => void;
  onSuccess?: () => void;
}

export default function SignInForm({
  onClose,
  openSignUp,
  onSuccess,
  ...props
}: FormProps) {
  type RegisterInputsType = z.infer<typeof FormSchema>;
  const { className, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);
  const defaultBg = className?.includes("bg-") ? "" : "bg-primary";

  const FormSchema = z.object({
    email: z
      .string()
      .min(1, "this field has to be filled.")
      .email("this is not a valid email."),
    password: z.string().min(6, "this field must have at least 6 letters."),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterInputsType>({ resolver: zodResolver(FormSchema) });
  const onSubmit: SubmitHandler<RegisterInputsType> = async (values) => {
    setIsLoading(true);
    await FormSchema.parseAsync(values);
    const response = await axiosRequest.user.login(
      values.email,
      values.password
    );
    setIsLoading(false);
    if (response.error) return toast.error(response.message);
    return (
      updateToken(response.token),
      toast.success(response.message),
      onClose(),
      onSuccess && onSuccess()
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        className ? className : ""
      } ${defaultBg} w-full h-full flex flex-col gap-3 p-4 `}
      {...rest}
    >
      <div className="flex justify-center items-center relative">
        <span className="font-montserrat self-center text-3xl font-semibold mb-10">
          Sign in
        </span>
        <button type="button" onClick={onClose}>
          <IoCloseSharp className="h-8 w-8 top-0 right-0 absolute" />
        </button>
      </div>
      <Input
        {...register("email")}
        disabled={isLoading}
        autoComplete="email"
        error={errors.email?.message}
        name="email"
        type="email"
        label="Email"
        id="email"
        placeholder="mrMuscle@gamil.com"
      />
      <Input
        {...register("password")}
        disabled={isLoading}
        autoComplete="password"
        error={errors.password?.message}
        isPassword={true}
        label="Password"
        name="password"
        id="password"
        placeholder="muscle123"
      />
      <Button disabled={isLoading} type="submit" className="self-center mt-16">
        Login
      </Button>

      <div className="self-center font-bold space-x-1 mt-auto">
        <div className="h-[1px] w-full bg-zinc-700 mb-5" />
        <span className="text-white text-opacity-50">
          Don't have an account
        </span>
        <button
          disabled={isLoading}
          type="button"
          onClick={openSignUp}
          className="underline underline-offset-2 disabled:pointer-events-none disabled:animate-pulse"
        >
          Sign up here
        </button>
      </div>
    </form>
  );
}
