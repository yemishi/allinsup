import { Swiper, SliderProps, ReactNode } from ".."
import { Navigation, A11y, Pagination, EffectFade, Autoplay, FreeMode } from "swiper/modules"


import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import './Slider.css'

interface PropsType {
    children: ReactNode,
    settings: SliderProps
}

export default function Slider({ settings, children }: PropsType) {

    return (
        <Swiper modules={[Navigation, Pagination, A11y, EffectFade, Autoplay, FreeMode]}  {...settings}>
            {children}
        </Swiper>
    )
}