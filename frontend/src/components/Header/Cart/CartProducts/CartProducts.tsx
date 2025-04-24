import { useCart } from "../../../../context/Provider";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { parseLocalCurrency } from "../../../../utils/formatting";
import { Image } from "../../../../ui";


export default function CartProducts() {
  const { cart, updateCart } = useCart();

  const updateAmount = (newValue: number, productIndex: number) => {
    const updated = cart.map((product, index) => {
      if (index === productIndex) product.amount = newValue;
      return product;
    });
    updateCart(updated);
  };

  const handleChange = (value: string, stock: number, productIndex: number) => {
    const updatedValue = Number(value) > stock ? stock : Number(value) < 1 ? 1 : Number(value);
    updateAmount(updatedValue, productIndex);
  };
  const remove = (productIndex: number) => {
    const updated = cart.filter((_, index) => index !== productIndex);
    updateCart(updated);
  };
  return (
    <div className="flex flex-col p-3 font-anton">
      {cart.map((product, index) => {
        const { name, coverPhoto, price, promotion, amount, _id, stock } = product;
        return (
          <div
            key={`${product._id}_${name}_${price}`}
            className="flex overflow-hidden flex-row gap-3 h-[170px] border-b pr-3 border-zinc-700 py-6 pb-5 relative"
          >
            <Link className="!flex" to={`/product/${_id}`}>
              <div onClick={() => updateAmount(amount + 1, index)} className="w-auto flex bg-white p-2 rounded-md">
                <Image
                  className="object-contain !min-w-[120px] !max-w-[120px] hover:scale-110 duration-300"
                  src={coverPhoto}
                />
              </div>
            </Link>

            <div className="flex flex-col text-sm pr-5 lg:text-lg w-full">
              <span className="hover:text-secondary-500 duration-300 ">{name}</span>

              <button onClick={() => remove(index)} className="absolute top-2 right-0 cursor-pointer self-start">
                <IoIosClose className="h-7 w-7 md:w-9 md:h-9 text-red-500" />
              </button>

              <div>
                Qtd:
                <span className="text-secondary-300 font-semibold">{amount}</span>
              </div>

              <div className="flex justify-between mt-auto items-end">
                <p className="text-secondary-500 font-bold text-lg lg:text-xl">
                  {parseLocalCurrency(promotion ? Number(promotion) : Number(price))}
                </p>
                <span className="flex border-gray-600 p-2 rounded-lg gap-2 border absolute right-2">
                  <button
                    onClick={() => updateAmount(amount - 1, index)}
                    className={`w-5 md:w-8 ${amount - 1 < 1 ? "pointer-events-none opacity-50" : ""}`}
                  >
                    <FiMinus className="!h-full !w-full" />
                  </button>

                  <input
                    onChange={(e) => {
                      handleChange(e.target.value, stock, index);
                    }}
                    inputMode="decimal"
                    type="number"
                    name="product qtd"
                    className="bg-transparent w-6 lg:w-10 outline-none text-center placeholder:text-white"
                    value={amount}
                  />

                  <button
                    onClick={() => updateAmount(amount + 1, index)}
                    className={`w-5 md:w-8 ${amount + 1 > stock ? "pointer-events-none opacity-50" : ""}`}
                  >
                    <IoIosAdd className="!w-full !h-full" />
                  </button>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
