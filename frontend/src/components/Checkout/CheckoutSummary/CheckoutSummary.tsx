import MotionDiv from "../../../ui/Divs/MotionDiv";
import { CartType } from "../../../types/response";
import { parseLocalCurrency } from "../../../utils/formatting";
import { Image } from "../../../ui";

export default function CheckoutSummary({ cart, method }: { cart: CartType[]; method: string }) {
  const totalPrice = cart.reduce((prev, curr) => prev + curr.price * curr.amount, 0);

  return (
    <MotionDiv reverse className="lg:min-w-[500px] max-w-2xl flex flex-col gap-3">
      <div className="flex font-bold text-secondary-200 mt-3 md:self-center md:gap-10 md:text-lg lg:text-xl w-full justify-between">
        <div className="flex gap-1">
          <span className="text-white">Payment method:</span>
          <span className="first-letter:uppercase">{method}</span>
        </div>

        <div className="flex gap-1">
          <span className="text-white">Price total:</span>
          <span className="first-letter:uppercase">{parseLocalCurrency(totalPrice)}</span>
        </div>
      </div>

      <div className="max-h-[500px] overflow-y-auto w-full">
        <table className="flex items-center justify-center w-full  ">
          <tbody className="flex flex-col gap-5 pt-4 w-full rounded  md:grid md:grid-cols-2 ">
            {cart.map((product, index) => {
              const { amount, coverPhoto, name, price } = product;
              const totalPrice = price * amount;
              return (
                <tr
                  key={`${name}_${index}`}
                  className="text-gray-200 flex md:flex-col gap-5 pr-2 
              w-full border-b border-primary-200 bg-primary-550 border lg:text-lg rounded-lg p-2"
                >
                  <td className="flex items-center bg-white p-2 rounded-md md:max-w-full  justify-center min-w-[40%] max-w-[40%]">
                    <Image className="bg-white h-36  object-contain lg:h-44" src={coverPhoto} />
                  </td>

                  <td>
                    <div className="flex flex-col h-full gap-2 font-anton overflow-hidden py-3 ">
                      <span className="font-semibold mr-5">{name}</span>
                      <span className="font-bold text-secondary-500 mt-auto">{parseLocalCurrency(totalPrice)}</span>
                      <span className="">Qtd: {amount}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </MotionDiv>
  );
}
