import { Slider, Slide, SliderProps } from ".."
import { useGlobalState } from "../../App"
import { parseAlt } from "../../utils"


interface ChildrenType {
    name: "Max Titanium" | "Growth" | "Probiótica" | "Integral médica" | "Black Skull" | "Diversas",
    banner: string
}

interface PropsType {
    children: ChildrenType[]
}

export default function RoundedSlider({ children }: PropsType) {
    const { dispatch, state } = useGlobalState()
    const settings: SliderProps = {
        freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 50,
        style: {
            width: "100%",
            padding: '20px',
            background: '#1e1e1e',
            cursor: "grab"
        },
        breakpoints: {
            1024: {
                allowTouchMove: false,
            }
        }
    }

    const brands: {
        "Max Titanium": "max titanium",
        "Growth": "growth",
        "Probiótica": "probiotica",
        "Integral médica": "integralmédica",
        "Black Skull": "black skull",
        "Diversas": ""
    } = {
        "Max Titanium": "max titanium",
        "Growth": "growth",
        "Probiótica": "probiotica",
        "Integral médica": "integralmédica",
        "Black Skull": "black skull",
        "Diversas": ""
    };

    return (
        <Slider settings={settings}>
            {children?.map((e) => {
                const { name, banner } = e
                const current = state.brandHome === brands[name] || state.brandHome === name

                return <Slide key={name} onClick={() => dispatch({ type: "SET_BRAND_HOME", payload: brands[name] })} className={`max-w-[110px] group
                !flex cursor-pointer ml-auto items-center flex-col gap-3 hover:text-secondary-200 duration-200 font-lato text-sm md:max-w-[130px] ${current ? "text-secondary-200" : "text-white"}`}>

                    <div className={`h-[110px] w-[110px] overflow-hidden duration-200 bg-primary rounded-full border-2 
                       ${current ? "border-secondary-200 border-[3px]" : "border-primary-200  group-hover:border-secondary-200 group-hover:border-opacity-50 group-hover:border-[3px]"}`}>
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