import { useState } from "react";
import axiosRequest from "../../../services/axios.config";
import { OrderType } from "../../../types/response";

import { parseLocalCurrency } from "../../../utils/formatting";
import { toast } from "react-toastify";
import { Button, Image, MotionDiv, Track } from "../../../ui";
import { IoCloseSharp } from "react-icons/io5";

interface PropsType {
  onClose: () => void;
  order: OrderType;
  onSuccess: () => void;
}

export default function EditOrder({ order: { products, status, _id }, onClose, onSuccess }: PropsType) {
  const [step, setStep] = useState<number>();

  const handleUpdate = async () => {
    if (!step) return onClose();
    const { error, message } = await axiosRequest.order.edit(stages[step], _id);
    if (error) return toast.error(message);

    toast.success(message), onClose(), onSuccess();
  };
  const stages = ["Pending", "Processing", "Shipped", "Out for delivery", "Delivered"];
  return (
    <MotionDiv className="modal-container relative">
      <div className="flex flex-col gap-6 py-4 w-full md:items-center ">
        <button
          type="button"
          className="absolute right-5 top-5 hover:scale-105 hover:brightness-110 active:scale-95 transition-all"
          onClick={onClose}
        >
          <IoCloseSharp className="h-8 w-8" />
        </button>

        <h2 className="font-bold text-lg md:text-2xl font-lato text-sky-300 mb-3">Delivery status</h2>

        <Track status={(step !== undefined && stages[step]) || status} updateState={(i: number) => setStep(i)} />
        <h2 className="font-bold text-lg md:text-2xl font-lato text-sky-300">Products</h2>
        <div className="flex md:grid md:grid-cols-2 flex-col gap-3">
          {[...products].map((product, index) => {
            const { coverPhoto, name, price, qtd } = product;
            return (
              <div
                key={`${product}_${index}`}
                className="flex md:p-4 relative bg-primary-600 rounded-lg border border-primary-200 w-full gap-2"
              >
                <span className="w-36 p-2 bg-white rounded-lg h-28">
                  <Image src={coverPhoto} className="object-contain w-full h-full" />
                </span>
                <span className="flex p-2 justify-between w-full items-center self-start">
                  <p className="self-center">{name}</p>
                  <p className="text-secondary-200 font-bold self-start">{`${qtd}x`}</p>
                </span>
                <p
                  className="bottom-0 right-0 absolute text-secondary-600 font-bold p-2 bg-primary rounded-tl-lg rounded-br-lg
                 border border-primary-200"
                >
                  {parseLocalCurrency(Number(price))}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full bottom-0 flex gap md:self-center mt-auto gap-2">
        <Button onClick={onClose} className="p-2 flex-1 bg-sky-600 ">
          Cancel
        </Button>
        <Button onClick={handleUpdate} className="p-2 flex-1 bg-secondary-600 ">
          Update
        </Button>
      </div>
    </MotionDiv>
  );
}
