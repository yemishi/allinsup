import { UserType } from "../../../types/response";
import Form, { InputsType } from "../Form";
import axiosRequest from "../../../services/axios.config";
import { toast } from "react-toastify";
interface Props {
  userInfo?: Omit<UserType, "password">;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function UserAddressForm({ userInfo, onClose, onSuccess }: Props) {
  const inputs: InputsType = {
    name: {
      label: "Address",
      value: userInfo?.address?.name || "",
      min: 3,
      inputProps: { autoFocus: true, type: "text", autoComplete: "address" },
    },
    cep: {
      label: "Cep",
      value: userInfo?.address?.cep || 2222,
      min: 1,
      inputProps: { type: "number", autoComplete: "cep" },
    },
    city: {
      label: "City",
      value: userInfo?.address?.city || "",
      min: 1,
      inputProps: { type: "text", autoComplete: "city" },
    },
    houseNumber: {
      label: "Number",
      value: userInfo?.address?.houseNumber || 1,
      inputProps: { required: true, type: "number", autoComplete: "house number" },
    },
    state: {
      label: "State",
      value: userInfo?.address?.state || "",
      min: 1,
      inputProps: { type: "text", autoComplete: "state" },
    },
    complement: { label: "Complement", value: userInfo?.address?.complement || "" },
  };

  const onSubmit = async (values: {
    address: string;
    cep: string;
    city: string;
    complement: string;
    houseNumber: number;
    name: string;
    state: string;
  }) => {
    const { error, message } = await axiosRequest.user.edit(undefined, undefined, values.name, values);
    if (error) return toast.error(message);
    if (onSuccess) onSuccess();
    onClose();
    toast.success(message);
  };

  return (
    <Form
      submitMessage="Update address "
      submitStyle="bg-none border-y"
      className="w-screen max-w-xl p-5"
      onSubmit={onSubmit}
      inputs={inputs}
    />
  );
}
