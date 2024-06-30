import CartPanel from "./CartPanel";

import { useCart, useTempOverlay } from "../../context/Provider";
import { LuShoppingCart } from "react-icons/lu";

export default function Cart() {
  const { cart } = useCart();
  const { setChildren, close } = useTempOverlay();
  const Cart = () => (
    <CartPanel
      cart={cart}
      onClose={() => {
        close(), (document.body.style.overflow = "");
      }}
    />
  );
  const open = () => {
    setChildren(<Cart />);
  };

  return (
    <button className="w-7 lg:w-10 relative" onClick={open}>
      <LuShoppingCart className="!w-full !h-full stroke-white stroke-[1.5] hover:stroke-[#fb923c] duration-200" />
      <span
        className="bg-secondary-500 font-bold absolute top-0 font-lato text-[8px] lg:text-sm lg:w-5 lg:h-5 text-white -right-1
                     rounded-full h-3 w-3"
      >
        {cart.length}
      </span>
    </button>
  );
}
