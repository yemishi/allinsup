import { createContext, useEffect, useState, Dispatch } from 'react'
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

    const [cartOpen, setCartOpen] = useState<boolean>(false)
    const [cart, setCart] = useState<CartType[]>([])


    useEffect(() => {
        document.body.style.overflow = cartOpen ? 'hidden' : 'auto';
    }, [cartOpen]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);
    const updateCart = (updatedCart: CartType[]) => {
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const addProduct = (product: ProductType) => {
        const { _id, name, coverPhoto, flavor, price, sizeProduct, stock, promotion } = product.toCart;
        const findProduct = cart.find((detail) => detail._id === _id && detail.name === name);

        const updatedCart: CartType[] = findProduct
            ? cart.map((e: CartType): CartType => (e._id === _id ? { ...e, amount: e.amount + 1 } : e))
            : [...cart, { _id, name, amount: 1, coverPhoto, flavor, price, sizeProduct, stock, promotion }];
        updateCart(updatedCart)
    };

    const incrementAmount = (product: (CartType), payload: (number)) => {
        const { name, _id } = product
        const updatedCart = cart.map((e) => e.name === name && e._id == _id && e.amount + payload <= e.stock ? { ...e, amount: e.amount + payload } : e)
        updateCart(updatedCart)

    }
    const decrementAmount = (product: (CartType), payload: (number)) => {

        const { name, _id } = product
        const updatedCart = cart.map((e) => e.name === name && e._id == _id && (e.amount - payload) >= 1 ? { ...e, amount: e.amount - payload } : e)
        updateCart(updatedCart)
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
        updateCart(updatedCart)

    }
    const removeProduct = (product: (CartType)) => {

        const findProduct = cart.find((detail) => detail._id === product._id && detail.flavor && product.flavor && detail.name === product.name );
        const filterCart = cart.filter((e) => e !== findProduct)

        updateCart(filterCart)
    };
    return <GlobalContext.Provider value={{ cart, cartOpen, setCartOpen, addProduct, removeProduct, incrementAmount, decrementAmount, updateProductAmount }}>
        {children}
    </GlobalContext.Provider >
}