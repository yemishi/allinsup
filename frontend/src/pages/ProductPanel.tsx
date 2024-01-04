import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { axiosRequest } from "../components"
import { ProductInfo } from "../features"

async function fetchProduct(flavor: string, size: string, _id: string) {
    const response = await axiosRequest.productInfo(flavor, size, _id)
    return response.data
}
async function fetchSimilarProducts(category: string) {
    const response = await axiosRequest.productsSearch(category, 1, 6)
    return response.data
}
export default function ProductPanel() {

    const { name, category, _id } = useParams()
    const nameArr = name?.split('-') || []
    const flavor = nameArr[1]
    const size = nameArr[2]

    const { data: product } = useQuery(['product', flavor, size, _id], () => fetchProduct(flavor, size, _id || ""), {
        retry: 5
    });
    const { data: similarProducts, } = useQuery(['similarProduct'], () => fetchSimilarProducts(decodeURIComponent(String(category)) || ""), {
        retry:5
    });

    return (
        <div className="flex flex-col items-center p-4">
            {product && <ProductInfo product={product} similarProducts={similarProducts?.filter((element) => element._id !== product._id)} />}
        </div>
    )
}