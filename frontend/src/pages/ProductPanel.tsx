import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { axiosRequest } from "../components"
import { ErrorPage, Loading, ProductInfo } from "../features"
import { motion } from "framer-motion"
import { blinkVariant } from "../utils"

async function fetchProduct(flavor: string, size: string, _id: string) {
    const response = await axiosRequest.productInfo(flavor, size, _id)
    return response.data
}
export default function ProductPanel() {
    const { name, _id } = useParams()
    const nameArr = name?.split('-') || []
    const flavor = nameArr[1]

    const size = nameArr[2]

    const { data: product, isLoading, error } = useQuery(['product', flavor, size, _id], () => fetchProduct(flavor, size, _id as string), {
        retry: 2
    });
    if (isLoading) return <Loading />
    if (error) return <ErrorPage msg="Não foi possivel recuperar esse produto."/>

    return (
        <motion.div variants={blinkVariant} transition={{ duration: 0.2 }} initial="initial" animate="animate" exit="exit"
            className="flex flex-col items-center p-4">
            {product && <ProductInfo product={product} q={product.category} />}
        </motion.div>
    )
}