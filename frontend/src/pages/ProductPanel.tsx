import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { axiosRequest } from "../components"
import { ErrorPage, Loading, ProductInfo } from "../features"

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
    if (error) return <ErrorPage />

    return (
        <div className="flex flex-col items-center p-4">
            {product && <ProductInfo product={product} q={"max creatina"} />}
        </div>
    )
}