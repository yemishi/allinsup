


import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import { CartType } from '../../types/response';
import axiosRequest from "../../services/axios.config";

export async function stripeCheckout({ method, cart, onSuccess }: { cart: CartType[], method: string, onSuccess: () => void }) {
    const line_items = cart.map((i) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: i.name,
                    images: [i.coverPhoto]
                },
                unit_amount: Math.round((i.promotion ?? i.price) * 100)
            },
            quantity: i.amount
        };
    });

    console.log("Creating checkout session...");

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY as string);

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/stripe/checkout`, {
            line_items,
            method
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const session = response.data;

        if (session.id) {
            const result = await stripe?.redirectToCheckout({
                sessionId: session.id
            });

            if (result?.error) {
                toast.error(result.error.message);
                return;
            }
            localStorage.setItem("test", "true")
            toast.success("Thanks for buying with us!");
            onSuccess();
        } else {
            toast.error("Failed to create a checkout session.");
        }
    } catch (error) {
        console.error("Error creating checkout session:", error);
        toast.error("Error creating checkout session. Please try again.");
    }
}


export async function createOrder(cart: CartType[], method: string, setLoading?: React.Dispatch<React.SetStateAction<boolean>>, onFinally?: () => void,
    updateCart?: (updatedCart: CartType[]) => void, onFailed?: () => void) {
    if (!cart.length) return
    if (setLoading) setLoading(true)
    const transformedCart = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        flavor: item.flavor,
        size: item.size,
        coverPhoto: item.coverPhoto,
        price: item.price,
        qtd: item.amount,
    }));

    const totalPrice = cart.reduce(
        (prev, curr) => prev + curr.price * curr.amount,
        0
    );
    const methodMap = {
        "cashOnDelivery": "Cash on delivery",
        "card": "Card",
        "amazon_pay": "Amazon pay",
        "paypal": "PayPal",
    }
    const mappedMethod = methodMap[method as keyof typeof methodMap] || "";
    const response = await axiosRequest.order.create(
        transformedCart,
        totalPrice,
        method = mappedMethod
    );

    if (response.error) {
        if (response.isUpdate) {
            const updatedCart = cart.filter((product) => {
                const { _id, flavor, size } = product;
                const findProduct = response.updated.find(
                    (i) => i._id === _id && i.flavor === flavor
                );
                if (!findProduct) return product;
                if (
                    findProduct.removed === "product" ||
                    findProduct.removed === "variant"
                )
                    return;

                const findSize = response.updated.find(
                    (i) => i._id === _id && i.flavor === flavor && i.size === size
                );
                if (!findSize) return product;
                if (findSize.removed === "size") return;
                const { updatedPrice, updatedStock } = findSize;
                return {
                    ...product,
                    price: updatedPrice || product.price,
                    stock: updatedStock || product.stock,
                };
            });
            if (updateCart) updateCart(updatedCart)
            if (setLoading) setLoading(false)
            toast.warn(response.message)
            return
        } else {
            if (onFailed) onFailed()
            if (setLoading) setLoading(false)
            toast.error(response.message)
            return
        }
    }

    if (updateCart) updateCart([])
    if (onFinally) onFinally()
}