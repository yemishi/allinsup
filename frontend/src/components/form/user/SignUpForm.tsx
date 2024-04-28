import { HTMLAttributes, useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button,";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosRequest, toast } from "../..";
import { IoCloseSharp } from "react-icons/io5";

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  onClose: () => void;
  openSignIn: () => void;
  onSuccess?: () => void;
}

export default function SignUpForm({
  onClose,
  openSignIn,
  onSuccess,
  ...props
}: FormProps) {
  type RegisterInputsType = z.infer<typeof FormSchema>;
  const { className, ...rest } = props;
  const [isLoading, setIsLoading] = useState(false);
  const defaultBg = className?.includes("bg-") ? "" : "bg-primary";

  const FormSchema = z.object({
    name: z
      .string()
      .min(3, "this field must have at least 3 letters.")
      .max(15, "the name field can have a maximum 15 character."),
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
    const { error, message } = await axiosRequest.user.create(
      values.email,
      values.password,
      values.name
    );
    setIsLoading(false);
    if (error) return toast.error(message);
    return toast.success(message), onClose(), onSuccess && onSuccess();
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
          Sign up
        </span>
        <button type="button" onClick={onClose}>
          <IoCloseSharp className="h-8 w-8 top-0 right-0 absolute" />
        </button>
      </div>
      <Input
        {...register("name")}
        autoComplete="name"
        disabled={isLoading}
        error={errors.name?.message}
        label="Name"
        id="name"
        placeholder="Mr muscle"
      />
      <Input
        {...register("email")}
        autoComplete="email"
        disabled={isLoading}
        error={errors.email?.message}
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
        id="password"
        placeholder="muscle123"
      />
      <Button disabled={isLoading} type="submit" className="self-center mt-16">
        Submit
      </Button>

      <div className="self-center font-bold space-x-1 mt-auto">
        <div className="h-[1px] w-full bg-zinc-700 mb-5" />
        <span className="text-white text-opacity-50">
          Already have a account?
        </span>
        <button
          disabled={isLoading}
          type="button"
          onClick={openSignIn}
          className="underline underline-offset-2 disabled:pointer-events-none disabled:animate-pulse"
        >
          Log in here
        </button>
      </div>
    </form>
  );
}
