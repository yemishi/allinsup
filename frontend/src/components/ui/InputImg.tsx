import { HTMLAttributes, forwardRef } from "react";
import { PiCameraPlusLight } from "react-icons/pi";
import { toast } from "react-toastify";
import { cleanClasses } from "../../utils/helpers";

interface InputFileProps extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (files: FileList) => void;
  id?: string;
}

const InputImage = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
  const { className, id, onChange, ...rest } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    if (!e.target.files[0].type.startsWith("image/")) return toast.error("Insert a valid image.");
    onChange(e.target.files);
  };
  return (
    <label
      htmlFor={id || `file`}
      className={cleanClasses(
        className,
        "h-12 w-12 bg-gray-300 p-3 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-95 active:scale-105 duration-150"
      )}
    >
      <input ref={ref} type="file" className="hidden" id={id || `file`} onChange={handleChange} {...rest} />

      <PiCameraPlusLight className="w-full h-full stroke-2 text-black" />
    </label>
  );
});

export default InputImage;
