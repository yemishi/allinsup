import React, { createContext, useReducer, Dispatch, ReactNode, useEffect } from 'react';
import { ProductType, CartType } from '../types';
import { toast } from "react-toastify"
import { axiosRequest } from '../components';

interface PaymentInfoType {
    wppMsg: string,
    extra: { paymentMethod: string, change: string | boolean },
    isPix?: boolean
}
interface GlobalState {
    cart: CartType[];
    paymentInfo: PaymentInfoType,
    brandHome: string;
    cartOpen: boolean;
    isLogged: boolean;
    userOpen: boolean;
    burgerOpen: boolean;
    addressOpen: boolean;
    paymentMethod: string;
}

type Action =
    | { type: 'SET_CART_OPEN'; payload: boolean }
    | { type: 'SET_BURGER_OPEN'; payload: boolean }
    | { type: 'SET_USER_OPEN'; payload: boolean }
    | { type: 'SET_ADDRESS_OPEN'; payload: boolean }
    | { type: 'SET_LOGIN'; payload: boolean }
    | { type: 'ADD_PRODUCT'; payload: ProductType }
    | { type: 'REMOVE_PRODUCT'; payload: CartType }
    | { type: 'INCREMENT_AMOUNT' | 'DECREMENT_AMOUNT' | 'UPDATE_PRODUCT_AMOUNT'; payload: { product: CartType; amount: number } }
    | { type: 'FIND_IN_CART'; payload: { cart: CartType[]; product: ProductType | CartType } }
    | { type: 'UPDATE_CART'; payload: CartType[] }
    | { type: 'SET_PAYMENT_METHOD'; payload: "Dinheiro" | "Cartão de Crédito" | "Cartão de Débito" | "Pix" }
    | { type: 'RESET_CART'; }
    | { type: 'SET_BRAND_HOME'; payload: "" | "max titanium" | "growth" | "probiotica" | "integralmédica" | "black skull" }
    | { type: 'SET_PAYMENT_INFO'; payload: PaymentInfoType }

const initialState: GlobalState = {
    cart: [],
    isLogged: localStorage.getItem("tel") ? true : false,
    burgerOpen: false,
    paymentInfo: { extra: { paymentMethod: "", change: "" }, isPix: false, wppMsg: "" },
    brandHome: "Diversas",
    cartOpen: false,
    userOpen: false,
    addressOpen: false,
    paymentMethod: ""
};

const reducer = (state: GlobalState, action: Action): GlobalState => {
    switch (action.type) {
        case 'SET_CART_OPEN':
            return { ...state, cartOpen: action.payload };
        case 'SET_BURGER_OPEN':
            return { ...state, burgerOpen: action.payload };
        case 'SET_USER_OPEN':
            return { ...state, userOpen: action.payload };
        case 'SET_LOGIN':
            return { ...state, isLogged: action.payload };
        case 'SET_ADDRESS_OPEN':
            return { ...state, addressOpen: action.payload };
        case "SET_BRAND_HOME":
            return { ...state, brandHome: action.payload }

        case "SET_PAYMENT_INFO":
            return { ...state, paymentInfo: action.payload }
        case 'FIND_IN_CART':
            const foundCartItem = state.cart.find(
                (detail) =>
                    detail._id === action.payload.product._id && detail.updatedName === action.payload.product.updatedName
            );

            return {
                ...state,
                cart: foundCartItem ? [foundCartItem] : [],
            };

        case 'UPDATE_CART':
            localStorage.setItem('cart', JSON.stringify(action.payload));
            return {
                ...state,
                cart: action.payload
            };

        case 'ADD_PRODUCT':
            const { _id, name, coverPhoto, flavor, price, sizeProduct, stock, promotion, category, updatedName } = action.payload.toCart;

            if (!stock) return { ...state }

            const findProduct = state.cart.find((detail) => detail._id === _id && detail.updatedName === updatedName);
            const updatedCartAdd = findProduct
                ? state.cart.map((e) => (e._id === _id && e.updatedName === updatedName && e.stock >= e.amount + 1 ? { ...e, amount: e.amount + 1 } : e))
                : [...state.cart, { _id, name, amount: 1, coverPhoto, flavor, price, sizeProduct, stock, promotion, category, updatedName }];

            if (!findProduct) toast.success("Produto adicionado ao carrinho",)

            localStorage.setItem('cart', JSON.stringify(updatedCartAdd));
            return {
                ...state,
                cart: updatedCartAdd
            };

        case 'INCREMENT_AMOUNT':
            const { product, amount } = action.payload;
            const foundProduct = state.cart.find(
                (detail) => detail._id === product._id && detail.updatedName === product.updatedName
            );

            if (!foundProduct) {
                const updatedCartInc = [
                    ...state.cart,
                    { ...product, amount: amount > product.stock ? product.stock : amount }
                ];
                localStorage.setItem('cart', JSON.stringify(updatedCartInc));
                return {
                    ...state,
                    cart: updatedCartInc
                };
            } else {
                const updatedCartInc = state.cart.map((e) =>
                    e.updatedName === product.updatedName && e._id === product._id && e.amount + amount <= e.stock
                        ? { ...e, amount: e.amount + amount }
                        : e
                );
                localStorage.setItem('cart', JSON.stringify(updatedCartInc));
                return {
                    ...state,
                    cart: updatedCartInc
                };
            };
        case 'DECREMENT_AMOUNT':
            const { product: decrementProduct, amount: decrementAmount } = action.payload;
            const updatedCartDec = state.cart.map((e) =>
                e.updatedName === decrementProduct.updatedName && e._id === decrementProduct._id && e.amount - decrementAmount >= 1
                    ? { ...e, amount: e.amount - decrementAmount }
                    : e
            );
            localStorage.setItem('cart', JSON.stringify(updatedCartDec));
            return {
                ...state,
                cart: updatedCartDec
            };
        case 'UPDATE_PRODUCT_AMOUNT':
            const { product: updateProduct, amount: target } = action.payload;
            if (action.payload.amount <= 0) {
                toast.error("algo deu errado, tente novamente")
                return state
            }
            const productInCart = state.cart.find((e) => e.updatedName === updateProduct.updatedName && e._id === updateProduct._id)
            console.log(action.payload)
            const updatedCart = () => {
                if (!productInCart) {
                    const updatedProduct = {
                        ...updateProduct,
                        amount: target > updateProduct.stock ? updateProduct.stock : target
                    };
                    toast.success("Produto adicionado ao carrinho")
                    return [...state.cart, updatedProduct];
                }

                return state.cart.map((e) =>
                    e._id === updateProduct._id && e.updatedName === updateProduct.updatedName
                        ? { ...e, amount: target > e.stock ? e.stock : target }
                        : e
                );
            };


            localStorage.setItem('cart', JSON.stringify(updatedCart()));
            return {
                ...state,
                cart: updatedCart()
            };
        case 'REMOVE_PRODUCT':
            const updatedCartRem = state.cart.filter((e) => e !== action.payload);
            localStorage.setItem('cart', JSON.stringify(updatedCartRem));
            return {
                ...state,
                cart: updatedCartRem
            };
        case 'RESET_CART':
            localStorage.removeItem('cart');
            return {
                ...state,
                cart: []
            };

        case 'SET_PAYMENT_METHOD':
            const method = action.payload
            return {
                ...state,
                paymentMethod: method
            };

        default: return state;
    }
};

export const GlobalContext = createContext<{ state: GlobalState; dispatch: Dispatch<Action> }>({
    state: initialState,
    dispatch: () => null,
});

interface GlobalContextProviderProps {
    children: ReactNode;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        document.body.style.overflow = state.cartOpen || state.userOpen || state.burgerOpen || state.addressOpen ? 'hidden' : 'auto';

    }, [state.cartOpen, state.userOpen, state.addressOpen, state.burgerOpen]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');

        if (savedCart) {
            const savedProducts = JSON.parse(savedCart) as CartType[];
            let isChanged = false;

            const fetchDataForProduct = async (product: CartType) => {
                const { _id, flavor, sizeProduct, amount, price: savedPrice } = product;

                try {
                    const response = await axiosRequest.productInfo(flavor, sizeProduct, _id);
                    const variantSelected = response.data.variants.find((variant) => variant.isSelected === true)
                    const sizeSelected = variantSelected?.sizeDetails.find((size) => size.isSelected === true);
                    console.log(variantSelected)

                    if (sizeSelected) {
                        const { price, stock } = sizeSelected;

                        if (stock === 0) return null;
                        if (price !== savedPrice || amount > stock) {
                            isChanged = true;
                        }

                        product.stock = stock;
                        product.price = price;

                        if (amount > stock) {
                            product.amount = stock;
                        }

                        return product;
                    }
                } catch (error) {
                    toast.warn("Não foi possivel recuperar alguns items do seu carrinho.");
                    console.log(error)
                    return null;
                }
            };

            const updateCart = async () => {
                const updatedProductsPromises = savedProducts.map((product) => fetchDataForProduct(product));
                const updatedProducts = await Promise.all(updatedProductsPromises);

                if (isChanged) {
                    toast.warn('Houve alterações em alguns produtos em seu carrinho. Já atualizamos para você.');
                }

                dispatch({ type: "UPDATE_CART", payload: updatedProducts.filter((product) => product !== null) as CartType[] });
                localStorage.setItem("cart", JSON.stringify(updatedProducts.filter((product) => product !== null)))
            };

            updateCart();
        }
    }, []);


    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};


export default GlobalContextProvider;