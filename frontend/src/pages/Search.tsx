
import { useSearchParams } from "react-router-dom"
import { SearchProduct } from "../features"
import { motion } from "framer-motion"
import { blinkVariant } from "../utils"

export default function Search() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('query') as string


    return (
        <motion.div animate="animate" exit="exit" initial="initial" variants={blinkVariant} transition={{ duration: 0.2 }} className="text-gray-200  overflow-hidden">
            <div className="font-lato pl-1 text-xl border-l-4 border-secondary-600 mt-7  font-medium m-4 ">
                <h1 >Resultados de  pesquisa:<br /> {query}</h1>
            </div>
            <SearchProduct query={query} />
        </motion.div >
    )
}