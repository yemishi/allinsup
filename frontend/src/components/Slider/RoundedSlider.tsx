import { Slider, Slide, SliderProps } from ".."


interface ChildrenType {
    name: string,
    banner: string
}

interface PropsType {
    children: ChildrenType[]
}

export default function RoundedSlider({ children }: PropsType) {

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

                return <Slide key={name} className="w-[110px] group flex items-center flex-col gap-3 text-white hover:text-[#fb923c] duration-200 font-lato text-sm">

                    <div className="h-[110px] w-[110px] overflow-hidden duration-200 bg-[#161616] rounded-full border-2
                     border-[#4a4a4a] group-hover:border-[#fb923c] group-hover:border-[3px] ">
                        <img src={banner} className="duration-300 group-hover:scale-110 rounded-full h-full w-full object-cover border-[#282828] border-2 " alt={banner} />
                    </div>

                    <div>
                        <p>{name}</p>
                    </div>
                </Slide>
            })}
        </Slider>
    )
}