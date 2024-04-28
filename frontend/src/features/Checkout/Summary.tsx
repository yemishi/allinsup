import { DivDraggable, Image } from "../../components";
import { CartType } from "../../types/response";
import { parseLocalCurrency } from "../../utils/formatting";

export default function Summary({
  cart,
  method,
}: {
  cart: CartType[];
  method: string;
}) {
  const totalPrice = cart.reduce(
    (prev, curr) => prev + curr.price * curr.amount,
    0
  );
  return (
    <DivDraggable
      exit="-100%"
      initialDirection="100%"
      removeAnimatePresence
      disableDrag
      className=" w-full"
    >
      <h2 className="font-anton text-xl p-2 w-max text-gray-200 md:self-center lg:text-2xl">
        Summary
      </h2>
      <div className="flex font-bold text-secondary-200 mt-3 md:self-center md:gap-10 md:text-lg lg:text-xl">
        <span>{method}</span>
        <span className="ml-auto">{parseLocalCurrency(totalPrice)}</span>
      </div>
      <table className="flex items-center justify-center w-full">
        <tbody className="flex flex-col gap-5 pt-4 w-full rounded  md:grid md:grid-cols-2 ">
          {[...cart, ...cart, ...cart].map((product, index) => {
            const { amount, coverPhoto, name, price } = product;
            const totalPrice = price * amount;
            return (
              <tr
                key={`${name}_${index}`}
                className="text-gray-200 flex md:flex-col gap-5 pr-2 
                        w-full border-b border-primary-200 bg-primary-550 border lg:text-lg rounded-lg p-2"
              >
                <td className="flex items-center bg-white p-2 rounded-md md:max-w-full  justify-center min-w-[40%] max-w-[40%]">
                  <Image
                    className="bg-white h-36  object-contain lg:h-44"
                    src={coverPhoto}
                  />
                </td>

                <td>
                  <div className="flex flex-col h-full gap-2 font-anton overflow-hidden py-3 ">
                    <span className="font-semibold mr-5">{name}</span>
                    <span className="font-bold text-secondary-500 mt-auto">
                      {parseLocalCurrency(totalPrice)}
                    </span>
                    <span className="">Qtd: {amount}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DivDraggable>
  );
}
