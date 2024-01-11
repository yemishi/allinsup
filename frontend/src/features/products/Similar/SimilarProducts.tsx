import { useQuery } from "react-query"
import { axiosRequest } from "../../../components"
import { ProductSliderGrid } from "../.."

export default function SimilarProduct({ q, title }: { q: string, title: string }) {
    const { data } = useQuery("similar-products", async () => {
        const response = await axiosRequest.productsSearch(q, 1, 5)
        return response.data
    })

    if (data?.length === 0 || !data) return null

    return <div className="flex flex-col gap-4 w-full mt-3">
        <span className="border-l-4 border-secondary-600 flex items-center justify-between ">
            <h3 className="font-lato font-semibold text-lg ml-1">{title}</h3>
        </span>
        {data && data.length !== 0 && <ProductSliderGrid children={data} />}
    </div>

}