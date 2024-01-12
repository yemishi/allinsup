import { useState } from "react"
import { useGlobalState } from "../../App"
import CartPanel from "./CartPanel"
import { motion } from "framer-motion"

export default function Cart() {
    const { dispatch, state } = useGlobalState()
    const variantsParent = {
        open: { opacity: 1 },
        exit: { opacity: 0, transition: { delay: 0.3 } }
    }

    const [isExiting, setIsExisting] = useState<boolean>(true);

    const handleCloseCart = () => {
        setIsExisting(false);
        setTimeout(() => {
            dispatch({ type: "SET_CART_OPEN", payload: false })
            setIsExisting(true)
        }, 700);
    }
    return (
        <>
            {state.cartOpen && <motion.div
                onClick={handleCloseCart} variants={variantsParent} animate={isExiting ? 'open' : 'exit'}
                className="w-screen z-30 h-full right-0 overflow-hidden fixed backdrop-brightness-50 flex flex-col">
                <CartPanel isExisting={isExiting} setIsExisting={setIsExisting} handleClose={handleCloseCart} />
            </motion.div >}
        </>
    )

}