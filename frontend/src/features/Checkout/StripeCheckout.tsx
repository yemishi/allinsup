import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import { CartType } from '../../types/response';

export default async function stripeCheckout({ method, cart }: { cart: CartType[], method: string}) {
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

            toast.success("Thanks for buying with us!");

        } else {
            toast.error("Failed to create a checkout session.");
        }
    } catch (error) {
        console.error("Error creating checkout session:", error);
        toast.error("Error creating checkout session. Please try again.");
    }
}
