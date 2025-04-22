import Form, { InputsType } from "../Form";
import axiosRequest, { updateToken } from "../../../services/axios.config";
import { toast } from "react-toastify";

export default function SigninForm({ onClose, onSuccess }: { onClose: () => void; onSuccess?: () => void }) {
  const inputs: InputsType = {
    email: { label: "Email", value: "", min: 1, isEmail: true, inputProps: { placeholder: "mrMuscle@gmail.com" } },
    password: { label: "Password", value: "", min: 6, isPassword: true, inputProps: { placeholder: "mrMuscle123" } },
  };
  const onSubmit = async (values: { email: string; password: string }) => {
    const response = await axiosRequest.user.login(values.email, values.password);
    if (response.error) return toast.error(response.message);
    updateToken(response.token);
    toast.success(response.message);
    if (onSuccess) onSuccess();
    onClose();
  };
  return <Form onSubmit={onSubmit} inputs={inputs} />;
}
