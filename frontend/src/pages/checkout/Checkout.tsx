import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/ui/Button,";
import { createOrder } from "../../features/Checkout/helpers";
import { useCart } from "../../context/Provider";

export default function Checkout() {
    const location = useLocation();
    const [isVerified, setIsVerified] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { cart, updateCart } = useCart()

    useEffect(() => {
        const verifyPayment = async () => {
            const queryParams = new URLSearchParams(location.search);
            const sessionId = queryParams.get("session_id");
            const token = queryParams.get("token");
            if (!sessionId || !token) {
                setError("Session ID is missing.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/stripe/confirm-payment?session_id=${sessionId}&token=${token}`).then((res) => res.data);
                if (response.success) {
                    setIsVerified(true);
                    if (cart.length > 0) {
                        setLoading(true)
                        await createOrder(cart, response.method, setLoading, undefined, updateCart)
                    }
                }
                else {
                    setIsVerified(false);
                    setError("Payment failed or is pending.");
                }
            } catch (error) {
                setIsVerified(false);
                setError("Error verifying payment.");
            }
            setLoading(false);
        };

        verifyPayment();
    }, [location]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[rgb(30,30,30)] text-gray-200 p-6">
            <div className="bg-[rgb(40,40,40)] p-8 sm:p-10 gap-4 flex flex-col items-center rounded-2xl shadow-xl max-w-md sm:max-w-lg w-full text-center border border-gray-700">
                {loading ? (
                    <div className="flex flex-col items-center animate-pulse">
                        <div className="text-6xl sm:text-7xl mb-4 text-yellow-500">⏳</div>
                        <h2 className="text-lg sm:text-xl font-semibold">Verifying Payment...</h2>
                    </div>
                ) : isVerified ? (
                    <div className="animate-fade-in">
                        <div className="text-6xl sm:text-7xl text-green-500 mb-4">✔️</div>
                        <h2 className="text-xl sm:text-2xl font-bold text-green-400">Payment Successful!</h2>
                        <p className="text-sm sm:text-base text-gray-400 mt-2">Your purchase has been processed successfully.</p>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <div className="text-6xl sm:text-7xl text-red-500 mb-4">❌</div>
                        <h2 className="text-xl sm:text-2xl font-bold text-red-400">Payment Failed</h2>
                        <p className="text-sm sm:text-base text-gray-400 mt-2">{error || "We couldn't confirm your payment. Please try again."}</p>
                    </div>
                )}

                <Button disabled={loading} className="bg-secondary-500 text-white py-2 px-6 rounded-lg mt-6 transition duration-300 hover:bg-secondary-600 focus:outline-none">
                    <Link to={"/"}>Go Home</Link>
                </Button>
            </div>
        </div>

    );
}
