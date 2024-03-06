import { axiosRequest } from "../../../components";
import { ProductType } from "../../../types";
import { ProductSliderGrid } from "../..";
import { UseQueryResult, useQuery } from "react-query";

export default function HighlightProducts() {

    const { data: highlight, isLoading }: UseQueryResult<ProductType[], unknown> = useQuery(
        "hightLight", () => {
            return axiosRequest.highlightProducts().then((response) => response.data)
        }, {
        retry: 5
    }
    )

    if (isLoading) return <div className={`relative bg-center  w-full min-h-[450px] bg-cover bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]`} >
        <div className="flex flex-row absolute bottom-0 z-10 gap-5"> {[null,null,null,null,null,null,null].map((_, index) => (

            <div key={index} className="h-[310px] flex flex-col justify-between items-center px-4 w-[200px] p-4 rounded-t-xl bg-[#282828]">
                <span className="animate-pulse bg-gray-600 w-full h-[162px] rounded-t-xl" />
                <span className="animate-pulse rounded-md bg-gray-600 w-full h-[40px]" />

                <div className="w-full flex justify-between">
                    <span className="h-[20px] rounded-md animate-pulse bg-gray-600 w-16" />
                    <span className="h-[20px] rounded-md animate-pulse bg-gray-600 w-16" />
                </div>

                <span className="animate-pulse bg-gray-600 w-full h-[32px] rounded-xl" />
            </div>

        ))}</div>
    </div >

    return (
        <div className={`bg-center w-full min-h-[420px] bg-cover flex items-end md:min-h-[600px] lg:min-h-[760px] 
        bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]`} >
            {highlight && (
                <ProductSliderGrid>
                    {...highlight}
                </ProductSliderGrid>
            )}
        </div >
    )

}




