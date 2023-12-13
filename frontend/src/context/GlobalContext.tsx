import { createContext, useEffect, useState, Dispatch } from 'react'
import axios from 'axios'
import { ProductType, CartType } from '../types'

interface Categories {
    whey: ProductType[],
    creatine: ProductType[],
    preWorkout: ProductType[],
    combo: ProductType[],

}

type GlobalState = {
    cart: CartType[];
    cartOpen: boolean;
    setCartOpen: Dispatch<React.SetStateAction<boolean>>;
    addProduct: (product: ProductType) => void;
    removeProduct: (product: CartType) => void;
    incrementAmount: (product: CartType, payload: number) => void;
    decrementAmount: (product: CartType, payload: number) => void;
    updateProductAmount: (product: CartType, payload: number) => void;
}


export const GlobalContext = createContext<GlobalState>({
    cart: [],
    cartOpen: false,
    setCartOpen: () => { },
    addProduct: () => { },
    removeProduct: () => { },
    incrementAmount: () => { },
    decrementAmount: () => { },
    updateProductAmount: () => { },
});

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {

    const [cartOpen, setCartOpen] = useState<boolean>(true)
    const [cart, setCart] = useState<CartType[]>([])

    const initializeCartFromStorage = () => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    };

    useEffect(() => {
        if (cartOpen) {
            document.body.style.overflow = "hidden"; // Impede o scroll no body
        } else {
            document.body.style.overflow = "auto"; // Restaura o scroll no body
        }
    }, [cartOpen]);

    useEffect(() => {
        initializeCartFromStorage();
    }, []);

    const addProduct = (product: ProductType) => {
        const { _id, variants, name, mainPhoto, updatedName } = product;
        const { flavor, sizeDetails } = variants[0];
        const size = sizeDetails.find((detail) => detail.sizeHighlight);

        if (!size) return;
        const { sizeProduct, price, stock, promotion } = size;

        const findProduct = cart.find((detail) => detail._id === _id && detail.name === updatedName);

        const updatedCart: CartType[] = findProduct
            ? cart.map((e: CartType): CartType => (e._id === _id ? { ...e, amount: e.amount + 1 } : e))
            : [...cart, { flavor, _id, amount: 1, mainPhoto, promotion, name: updatedName || "", price, sizeProduct, stock }];

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const incrementAmount = (product: (CartType), payload: (number)) => {
        const { name, _id } = product

        const updatedCart = cart.map((e) => e.name === name && e._id == _id && e.amount + payload <= e.stock ? { ...e, amount: e.amount + payload } : e)
        setCart((updatedCart))

        localStorage.setItem('cart', JSON.stringify(updatedCart));

    }
    const decrementAmount = (product: (CartType), payload: (number)) => {

        const { name, _id } = product
        const updatedCart = cart.map((e) => e.name === name && e._id == _id && (e.amount - payload) >= 1 ? { ...e, amount: e.amount - payload } : e)
        setCart((updatedCart))

        localStorage.setItem('cart', JSON.stringify(updatedCart));

    }
    const updateProductAmount = (product: (CartType), target: (number)) => {

        const { name, _id } = product

        const updatedCart: CartType[] = cart.map((e: CartType): CartType => {

            if (e._id === _id && e.name === name) {
                if (target > e.stock) {
                    target = e.stock
                    return { ...e, amount: e.stock }
                } if (target < 1) {
                    target = 1
                    return { ...e, amount: 1 }
                } else {
                    return { ...e, amount: target }
                }
            } else return e
        })

        setCart((updatedCart))

        localStorage.setItem('cart', JSON.stringify(updatedCart));

    }
    const removeProduct = (product: (CartType)) => {
        const updatedCart = cart.filter((e) => e._id !== product._id && e.name !== product.name);

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    return <GlobalContext.Provider value={{ cart, cartOpen, setCartOpen, addProduct, removeProduct, incrementAmount, decrementAmount, updateProductAmount }}> {children}</GlobalContext.Provider >
}