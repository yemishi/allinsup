import { Slider, Slide, SliderProps } from "../Components"
import { PropsType } from "./index"
import './MenuStyle.css'
export default function RoundedMenu({ children }: PropsType) {

    const settings: SliderProps = {
        spaceBetween: 40,
        freeMode: true,
        slidesPerView: "auto",
        style: {
            width: "100%",
            padding: '20px',
            background: '#1e1e1e',
        }
    }


    return (
        <Slider settings={settings}>
            {children?.map((e) => {
                const { name, color, banner } = e

                return <Slide key={name} className="w-[110px] test4 duration-500 flex items-center flex-col gap-3 text-white font-lato text-sm">
                    <div className="h-[110px] w-[110px] flex duration-500 testChild items-center justify-center rounded-full border-2 border-[#4a4a4a]">
                        <img src={banner} className=" duration-500 rounded-full h-full w-full object-cover bg-[#161616] border-gray-800 border-2 " alt={banner} />
                    </div>

                    <div>
                        <p>{name}</p>
                    </div>
                </Slide>
            })}
        </Slider>
    )
}