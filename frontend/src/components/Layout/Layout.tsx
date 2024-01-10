import { ReactNode } from "react";
import { motion } from "framer-motion"
export default function Layout({ children }: { children: ReactNode }) {
    return <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
        }}
    >
        {children}
    </motion.div>
}