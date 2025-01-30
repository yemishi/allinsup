import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { CartType } from "../types/response";
import { Elements } from '@stripe/react-stripe-js';

const queryClient = new QueryClient();

const TempOverlay = createContext<
  | {
    children: React.ReactNode;
    setChildren: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    close: () => void;
    setClassName: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
  }
  | undefined
>(undefined);

const Cart = createContext<
  { cart: CartType[]; updateCart: (cart: CartType[]) => void } | undefined
>(undefined);

export function useCart() {
  const context = useContext(Cart);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

export function useTempOverlay() {
  const context = useContext(TempOverlay);

  if (!context) {
    throw new Error("useTempOverlay must be used within a TempOverlayProvider");
  }
  return context;
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<React.ReactNode>();
  const [cart, setCart] = useState<CartType[]>([]);
  const [className, setClassName] = useState<string>("");
  const updateCart = (newCart: CartType[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const closeOverlay = () => {
    setContent(null), setClassName("");
  };
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Cart.Provider value={{ cart, updateCart }}>
        <TempOverlay.Provider
          value={{
            children: content,
            setChildren: setContent,
            close: closeOverlay,
            className,
            setClassName,
          }}
        >
          {children}
        </TempOverlay.Provider>
      </Cart.Provider>
    </QueryClientProvider>
  );
}
