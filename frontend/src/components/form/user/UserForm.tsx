import { z } from "zod";
import { UserType } from "../../../types/response";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosRequest from "../../../services/axios.config";
import { HTMLAttributes, useState } from "react";
import { IoIosClose } from "react-icons/io";

import DivDraggable from "../../ui/DivDraggable";
import Input from "../../ui/Input";
import EditableText from "../../ui/EditableText";
import Button from "../../ui/Button,";
import { toast } from "react-toastify";

interface PropsType extends HTMLAttributes<HTMLDivElement> {
  userInfo: Omit<UserType, "password">;
  onClose: () => void;
  onSuccess?: () => void;
}
export default function UserForm({
  userInfo: { address, name },
  onClose,
  onSuccess,
  ...props
}: PropsType) {
  type InputsType = z.infer<typeof FormSchema>;
  const FormSchema = z.object({
    name: z
      .string()
      .min(3, "this field must have at least 3 characters")
      .default(name),
    address: z.string().min(1, "this field is required"),

    cep: z.string().min(1, "this field is required"),
    city: z.string().min(1, "this field is required"),
    houseNumber: z.number().min(1, "this field is required"),
    state: z.string().min(1, "this field is required"),
    complement: z.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...address,
      name,
      houseNumber: 11,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<InputsType> = async (values) => {
    setIsLoading(true);
    FormSchema.parseAsync(values);
    const { error, message } = await axiosRequest.user.edit(
      undefined,
      undefined,
      values.name,
      values
    );
    setIsLoading(false);
    if (error) return toast.error(message);

    onSuccess && onSuccess();
    return onClose(), toast.success(message);
  };

  return (
    <DivDraggable
      className={`h-full w-full  ${props.className ? props.className : ""}`}
      closeParent={onClose}
      initialDirection="100%"
    >
      <form
        className="p-4 bg-primary-600 h-full w-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <button onClick={onClose} type="button">
          <IoIosClose className="w-7 h-7 md:w-10 md:h-10" />
        </button>
        <EditableText
          id="name"
          disabled={isLoading}
          autoFocus={false}
          placeholder={name}
          autoComplete="name"
          error={errors.name?.message}
          className="self-center text-center text-2xl font-montserrat mb-5"
          {...register("name")}
        />
        <Input
          id="address"
          disabled={isLoading}
          autoComplete="address"
          error={errors.address?.message}
          label="Address"
          placeholder={address?.address || "your address"}
          {...register("address")}
        />
        <Input
          id="state"
          disabled={isLoading}
          autoComplete="state"
          error={errors.state?.message}
          label="State"
          placeholder={address?.state || "your state"}
          {...register("state")}
        />
        <Input
          id="city"
          disabled={isLoading}
          autoComplete="city"
          error={errors.city?.message}
          label="City"
          placeholder={address?.city || "your city"}
          {...register("city")}
        />
        <Input
          id="houseNumber"
          disabled={isLoading}
          type="number"
          autoComplete="house number"
          error={errors.houseNumber?.message}
          label="House number"
          placeholder={String(address?.houseNumber) || "your house number"}
          {...register("houseNumber", { valueAsNumber: true })}
        />
        <Input
          id="cep"
          disabled={isLoading}
          type="number"
          autoComplete="cep"
          error={errors.cep?.message}
          label="Cep"
          placeholder={address?.cep || "your cep"}
          {...register("cep")}
        />
        <textarea
          className="bg-primary-400 focus:bg-primary-200 mt-5 placeholder:text-white placeholder:text-opacity-50 max-h-48 h-40 p-2
           outline-none lg:text-xl rounded-lg disabled:pointer-events-none disabled:animate-pulse"
          id="complement"
          disabled={isLoading}
          autoComplete="complement"
          placeholder={address?.complement || "Additional info"}
          {...register("complement")}
        />
        <Button disabled={isLoading} type="submit" className="self-center mt-8">
          Submit
        </Button>
      </form>
    </DivDraggable>
  );
}
