import { SliderProps, axiosRequest } from "../../../components";
import { ProductType } from "../../../types";
import HighlightConfig from './HighlightConfig'
import { UseQueryResult, useQuery } from "react-query";

export default function HighlightProducts() {

    const boxes = Array(4).fill(null);

    const { data: highlight, isLoading }: UseQueryResult<ProductType[], unknown> = useQuery(
        "hightLight", () => {
            return axiosRequest.highlightProducts().then((response) => response.data)
        }, {
        retry: 5
    }
    )

    if (isLoading) return <div className={`relative bg-center w-full min-h-[450px] bg-cover bg-[url('https://wallpapers-hub.art/wallpaper-images/166012.jpg')]`} >
        <div className="flex flex-row absolute bottom-0 z-10 gap-5"> {boxes.map((_, index) => (

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

    const settings: SliderProps = {
        spaceBetween: 20,
        freeMode: true,
        slidesPerView: "auto",
        grabCursor: true,
        style: {
            background: 'linear-gradient(transparent,#161616)',
            position: 'absolute',
            height: "310px",
            cursor: 'grab',
            width: '100%',
            bottom: 0,
            zIndex: 10
        }
    }

    return (
        <div className={`relative bg-center w-full  min-h-[420px] bg-cover
        bg-[url('https://wallpapers-hub.art/wallpaper-images/166012.jpg')]`} >
            {highlight && (
                <HighlightConfig settings={settings}>
                    {...highlight}
                </HighlightConfig>
            )}
        </div >
    )
}