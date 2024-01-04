import { Slider, Slide, SliderProps } from ".."
import { useGlobalState } from "../../App"
import { parseAlt } from "../../utils"


interface ChildrenType {
    name: "Max Titanium" | "Growth" | "Probiotica" | "Integral médica" | "Black Skull" | "Diversas",
    banner: string
}

interface PropsType {
    children: ChildrenType[]
}

export default function RoundedSlider({ children }: PropsType) {
    const { dispatch, state } = useGlobalState()
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
                const { name, banner } = e
                const current = state.brandHome === name

                return <Slide key={name} onClick={() => dispatch({ type: "SET_BRAND_HOME", payload: name })} className={`max-w-[110px] group 
                !flex cursor-pointer items-center flex-col gap-3  hover:text-secondary-200 duration-200 font-lato text-sm ${current ? "text-secondary-200" : "text-white"}`}>

                    <div className={`h-[110px] w-[110px] overflow-hidden duration-200 bg-primary rounded-full border-2
                      group-hover:border-secondary-200 group-hover:border-[3px] ${current ? "border-secondary-200 border-[3px]" : "border-primary-200"}`}>
                        <img src={banner} className="duration-300 group-hover:scale-105 rounded-full h-full w-full object-cover border-primary-500 border-2 " alt={parseAlt(banner)} />
                    </div>

                    <div>
                        <p>{name}</p>
                    </div>
                </Slide>
            })}
        </Slider>
    )
}