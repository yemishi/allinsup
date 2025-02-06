import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/ui/Button,";
import { createOrder } from "../../features/Checkout/helpers";
import { useCart } from "../../context/Provider";


export default function CheckoutPage() {
    const location = useLocation();
    const [{ message, status }, setData] = useState<{ status: "loading" | "success" | "failed", message: string }>({ status: "loading", message: "Verifying Payment..." })
    const { cart, updateCart } = useCart()
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (orderPlaced) updateCart([]);
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [orderPlaced]);

    useEffect(() => {
        if (cart.length === 0) return setData({ status: "failed", message: "Invalid session." });

        const verifyPayment = async () => {
            const queryParams = new URLSearchParams(location.search);
            const sessionId = queryParams.get("session_id");
            const token = queryParams.get("token");
            if (!sessionId || !token) {
                setData({ status: "failed", message: "Invalid session." });
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/stripe/confirm-payment?session_id=${sessionId}&token=${token}`).then((res) => res.data);
                if (response.success) {
                    setData({ status: "loading", message: "Creating order" });
                    await createOrder(cart, response.method, undefined, () => {
                        setOrderPlaced(true)
                        setData({ status: "success", message: "Order received successfully." })
                    });
                } else {
                    setData({ status: "failed", message: "Payment failed or is pending." });
                }
            } catch (error) {
                setData({ status: "failed", message: "Error verifying payment." });
            }
        };

        verifyPayment();
    }, [location.search, cart]);


    return (
        <div className="flex items-center justify-center min-h-screen text-gray-200 p-6">
            <div className="bg-[rgb(40,40,40)] p-8 sm:p-10 gap-4 flex flex-col items-center rounded-2xl shadow-xl max-w-md sm:max-w-lg w-full text-center border border-gray-700">
                {status === "loading" ? (
                    <div className="flex flex-col items-center animate-pulse">
                        <div className="text-6xl sm:text-7xl mb-4 text-yellow-500">⏳</div>
                        <h2 className="text-lg sm:text-xl font-semibold">Verifying Payment...</h2>
                    </div>
                ) : <div className="animate-fade-in">
                    <div className={`text-6xl sm:text-7xl ${status === "success" ? "text-green-500 mb-4" : "text-red-500 mb-4"}`}>{status === "success" ? "✔️" : "❌"}</div>
                    <h2 className={`text-xl sm:text-2xl font-bold ${status === "success" ? "text-green-400" : "text-red-400"}`}>{message}</h2>
                    <p className="text-sm sm:text-base text-gray-400 mt-2">{status === "success" ? "Your purchase has been processed successfully." : "We couldn't confirm your payment. Please try again."}</p>
                </div>}
                <Button className="bg-secondary-500 text-white py-2 px-6 rounded-lg mt-6 transition duration-300 
                hover:bg-secondary-600 focus:outline-none">
                    <Link to={"/"}>Go Home</Link>

                </Button>
            </div>
        </div >

    );
}
