import { motion } from "framer-motion";
import { useState, useRef, ReactNode } from "react";

import { DivDraggable } from "../../components";
import { useCart } from "../../context/Provider";
import { CartType } from "../../types/response";
import { stickyVariant } from "../../utils/helpers";
import { RxExit } from "react-icons/rx";

import CartProducts from "./CartProducts";
import Checkout from "../Checkout/CheckoutGrid";
import Modal from "../../components/Modal";

interface PropsType {
  onClose: () => void;
  cart: CartType[];
}

export default function CartPanel({ onClose }: PropsType) {
  const { cart } = useCart();

  const [isModal, setIsModal] = useState<ReactNode | false>(false);
  const [headerPosition, setHeaderPosition] = useState<boolean>(false);
  const initialScrollValue = useRef<number>(0);

  const onScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLDivElement;
    const { scrollTop } = target;

    if (scrollTop > initialScrollValue.current) {
      setHeaderPosition(false);
    } else {
      setHeaderPosition(true);
    }
    initialScrollValue.current = scrollTop;
  };

  return (
    <DivDraggable
      onScroll={onScroll}
      className="ml-auto md:border-l md:border-primary-200 md:rounded-l-lg"
      initialDirection={"100%"}
      closeParent={onClose}
    >
      <motion.div
        variants={stickyVariant}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        animate={headerPosition ? "sticky" : "noSticky"}
        onClick={() => setHeaderPosition(!headerPosition)}
        className="w-full flex top-0 justify-between z-10 flex-col p-5 h-[83px] bg-secondary rounded-b-xl"
      >
        <div className="flex w-full justify-between">
          <span className="mt-auto font-bold text-xl">shopping cart</span>

          <button onClick={onClose} className="cursor-pointer self-end">
            <RxExit className="hover:text-black w-7 h-7 stroke-1" />
          </button>
        </div>
      </motion.div>
      {cart.length > 0 ? (
        <CartProducts />
      ) : (
        <div className="p-5 mt-3">
          <span>Your cart is empty</span>
        </div>
      )}
      <div className="sticky mt-auto bottom-0 w-full flex justify-center items-center py-4 px-2">
        {isModal && <Modal onClose={() => setIsModal(false)}>{isModal}</Modal>}
        <button
          onClick={() => setIsModal(<Checkout onClose={() => setIsModal(false)} />)}
          className={`${
            cart.length === 0 ? "opacity-50 pointer-events-none bg-white text-black" : "bg-secondary-600 cursor-pointer"
          }    font-lato py-4 px-6 text-sm font-semibold rounded-xl`}
        >
          CONTINUE
        </button>
      </div>
    </DivDraggable>
  );
}
