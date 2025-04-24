import CartPanel from "./CartPanel/CartPanel";
import Modal from "../../Modal/Modal";

import { useCart } from "../../../context/Provider"; 
import { LuShoppingCart } from "react-icons/lu";
import { useState } from "react";

export default function Cart() {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const closeCart = () => setIsCartOpen(false);

  return (
    <button className="w-7 lg:w-10 relative" onClick={() => setIsCartOpen(true)}>
      {isCartOpen && (
        <Modal className="ml-auto" onClose={closeCart}>
          <CartPanel cart={cart} onClose={closeCart} />
        </Modal>
      )}
      <LuShoppingCart className="!w-full !h-full stroke-white stroke-[1.5] hover:stroke-[#fb923c] duration-200" />
      <span className="bg-secondary-500 font-bold absolute top-0 font-lato text-[8px] lg:text-sm lg:w-5 lg:h-5 text-white -right-1 rounded-full h-3 w-3">
        {cart.length}
      </span>
    </button>
  );
}
