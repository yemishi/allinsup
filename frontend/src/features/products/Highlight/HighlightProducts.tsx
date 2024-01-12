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

    if (isLoading) return <div className={`relative bg-center  w-full min-h-[450px] bg-cover bg-[url('https://cdn.discordapp.com/attachments/914969778387570688/1181751820968800306/Design_sem_nome_5.png?ex=658b6da6&is=6578f8a6&hm=1ba88c0b7b5b5b81ebedfa12287be13c3354d5f7c082c657f75b13fa81fe8215&')]`} >
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
        bg-[url('https://cdn.discordapp.com/attachments/914969778387570688/1181751820968800306/Design_sem_nome_5.png?ex=658b6da6&is=6578f8a6&hm=1ba88c0b7b5b5b81ebedfa12287be13c3354d5f7c082c657f75b13fa81fe8215&')]`} >
            {highlight && (
                <ProductSliderGrid>
                    {...highlight}
                </ProductSliderGrid>
            )}
        </div >
    )

}




