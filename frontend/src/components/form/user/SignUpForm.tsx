import Form, { InputsType } from "../Form";
import axiosRequest from "../../../services/axios.config";
import { toast } from "react-toastify";
interface Props {
  gotoSignIn: () => void;
}
export default function SignUpForm({ gotoSignIn }: Props) {
  const inputs: InputsType = {
    name: { label: "Name", value: "", min: 3, max: 15 },
    email: { label: "Email", value: "", min: 1, isEmail: true },
    password: { label: "Password", value: "", min: 6, isPassword: true },
    confirmPassword: { label: "Confirm Password", value: "", min: 6, compareField: "password" },
  };
  const onSubmit = async (values: { email: string; password: string; name: string }) => {
    const { error, message } = await axiosRequest.user.create(values.email, values.password, values.name);
    if (error) return toast.error(message);
    gotoSignIn();
    toast.success(message);
  };
  return <Form onSubmit={onSubmit} inputs={inputs} />;
}
