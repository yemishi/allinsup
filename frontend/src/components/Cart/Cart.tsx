import { useState } from "react"
import { useGlobalState } from "../../App"
import CartPanel from "./CartPanel"
import { motion } from "framer-motion"

export default function Cart() {
    const { cart, cartOpen, setCartOpen } = useGlobalState()
    const variantsParent = {
        open: { opacity: 1 },
        exit: { opacity: 0, transition: { delay: 0.3 } }
    }

    const [isExiting, setIsExiting] = useState(true);

    const handleCloseCart = () => {
        setIsExiting(false);

        setTimeout(() => {
            setCartOpen(false);
            setIsExiting(true)
        }, 700);
    }
    return (
        <>
            {cartOpen && <motion.div
                onClick={handleCloseCart} variants={variantsParent} animate={isExiting ? 'open' : 'exit'}
 
                className="w-full  z-30  h-screen overflow-hidden absolute backdrop-brightness-50 flex flex-col">

                <CartPanel cartOpen={isExiting} handleClose={handleCloseCart} />
            </motion.div >}
        </>
    )

}