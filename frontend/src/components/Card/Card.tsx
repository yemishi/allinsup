import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CartType } from "../../types/response";
import { BsCartPlus } from "react-icons/bs";
import { parseLocalCurrency } from "../../utils/formatting";
import { motion } from "framer-motion";
import { Image } from "../../ui";

interface PropsType {
  addToCart: () => void;
  props: Omit<CartType, "flavor" | "size">;
}

export default function Card({
  props: { _id, amount, coverPhoto, name, price, stock, promotion },
  addToCart,
}: PropsType) {
  const soldOff = stock && amount + 1 > stock;
  return (
    <motion.div
      className="flex hover:shadow-lightOn duration-300  flex-col
    flex-1 min-w-[165px] max-w-[250px] md:min-w-[185px] border border-primary-200 lg:min-w-[250px] lg:max-w-[280px] lg:h-[342px] text-white bg-primary-500 p-1 md:p-2 gap-2 pb-2 md:pb-3 md:gap-4 rounded-lg"
    >
      <div className="flex flex-col gap-2 h-full pb-1">
        <Link to={`/product/${_id}`} className="bg-white p-4 cursor-pointer rounded-md ">
          <Image src={coverPhoto} className="w-full h-44 object-contain hover:scale-105 " />
        </Link>

        <span className="truncate-2-lines">{name}</span>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-row gap-2 relative">
            {promotion && (
              <span className="font-bold text-secondary-500 duration-300 hover:text-secondary-700">
                {parseLocalCurrency(Number(promotion))}
              </span>
            )}
            <p
              className={`${
                promotion
                  ? "text-[10px] md:text-xs lg:text-sm text-gray-300  absolute right-0 -bottom-4 line-through "
                  : "hover:text-secondary-700 text-secondary-500"
              } font-bold duration-300 `}
            >
              {parseLocalCurrency(Number(price))}
            </p>
          </div>

          <button
            onClick={addToCart}
            className={`border py-1 duration-300 px-3 
                rounded-lg relative ${!amount && !soldOff ? "border-white " : "border-secondary-500 "}
                 ${soldOff ? "pointer-events-none grayscale" : "cursor-pointer"} group`}
          >
            <BsCartPlus
              className={`!w-5 !h-5 md:!w-6 md:!h-6 lg:!w-7 lg:!h-7 ${
                !amount && !soldOff ? "!text-white" : "text-secondary-500 "
              } group-hover:scale-105 duration-300`}
            />

            {amount > 0 && (
              <span className="bg-secondary-600 w-5 h-5 md:w-6 md:h-6 absolute duration-300 -top-1 -right-1 md:-top-2 rounded-full flex justify-center items-center">
                <AnimatePresence mode="wait">
                  <span
                    key={amount}
                    className={`text-xs md:text-sm after:content-["+1"] font-bold after:ml-0.5 pong absolute after:text-green-300 after:font-bold after:absolute  
                            after:-top-1 after:left-0 after:h-7 `}
                  >
                    {amount}
                  </span>
                </AnimatePresence>
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
