import { useState } from "react";
import axiosRequest from "../../../services/axios.config";
import { OrderType } from "../../../types/response";

import { parseLocalCurrency } from "../../../utils/formatting";
import { toast } from "react-toastify";
import { DivDraggable, Track } from "../../../ui";

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
    <DivDraggable
      maxMd
      initialDirection="-100%"
      className="w-full flex flex-col p-4 h-full md:rounded-lg"
      closeParent={onClose}
    >
      <div className="flex flex-col gap-6 py-4 w-full md:items-center ">
        <p className="font-bold text-lg md:text-xl font-anton text-sky-300">Products</p>

        <div className="flex md:grid flex-col gap-3">
          {[...products, ...products].map((product, index) => {
            const { coverPhoto, name, price, qtd } = product;
            return (
              <div
                key={`${product}_${index}`}
                className="flex md:p-4 md:border-t md:border-primary-200 relative bg-primary-500 w-full font-anton gap-4"
              >
                <span className="w-32 p-2 bg-white  rounded-l-md h-28">
                  <img src={coverPhoto} className="object-contain w-full h-full" alt="" />
                </span>
                <span className="flex p-2 justify-between w-full items-center self-start">
                  <p className="self-center">{name}</p>
                  <p className="text-secondary-200 font-bold self-start">{`${qtd}x`}</p>
                </span>
                <p className="bottom-0 right-0 absolute text-secondary-600 font-bold p-2 bg-primary rounded-tl-lg">
                  {parseLocalCurrency(Number(price))}
                </p>
              </div>
            );
          })}
        </div>

        <p className="font-bold text-lg md:text-xl font-anton text-sky-300">Delivery status</p>

        <Track status={(step !== undefined && stages[step]) || status} updateState={(i: number) => setStep(i)} />
      </div>
      <div className="w-full sticky z-20 bottom-0 flex gap md:self-center mt-auto gap-2">
        <button onClick={onClose} className="p-2 flex-1 font-anton font-semibold bg-sky-600 ">
          Cancel
        </button>
        <button onClick={handleUpdate} className="p-2 flex-1 font-anton font-semibold bg-secondary-600 ">
          Update
        </button>
      </div>
    </DivDraggable>
  );
}
