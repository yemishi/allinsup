import { Dispatch, SetStateAction } from "react";
import { Slide, Slider, SliderProps } from "../components"

interface SelectedState {
    selected: "flavor" | "sizeProduct";
    title: string;
    state: number;
    setState: Dispatch<SetStateAction<number>>;
}
export interface OptionsArrayType {
    flavor?: string
    sizeProduct?: string,
}
export const slideOptions = (array: OptionsArrayType[], selectedState: SelectedState) => {
    const classActive = (count: number, index: number) => count === index ? "border-secondary-200" : "opacity-50 border-white";
    const { selected, setState, state, title } = selectedState;
    const minLaptop = window.matchMedia("(min-width:1024px)").matches

    const settingsOptions: SliderProps = {
        spaceBetween: 20,
        slidesPerView: 'auto',
        style: {
            width: "100%",
        },

    };

    return (
        <div className="flex gap-2 flex-col border-b pb-3 border-opacity-30 border-white">
            <span className="gap-1 flex font-lato">
                <p className="font-thin lg:text-xl lg:font-semibold">{title}</p>
            </span>

            <p className="lg:hidden text-secondary-200">{array[state] ? array[state][selected] : array[0][selected]}</p>

            {minLaptop ? <div className="w-full flex-wrap hidden lg:flex gap-4">
                {(array).map((e, i) => {
                    const item = e[selected]
                    return (
                        <div key={`${e}-${i}`} className={`!w-auto`} onClick={() => setState(i)}>
                            <div className={`!w-auto border-2 cursor-pointer text-lg ${classActive(state, i)} font-semibold p-2 rounded-lg font-lato`}>
                                <p>{item}</p>
                            </div>
                        </div>
                    );
                })}
            </div> : <Slider settings={settingsOptions}>
                {(array).map((e, i) => {
                    const item = e[selected]
                    return (
                        <Slide key={`${e}-${i}`} className={`!w-auto`} onClick={() => setState(i)}>
                            <div className={`!w-auto border-2 cursor-pointer text-sm md:text-base  ${classActive(state, i)} font-semibold p-2 rounded-lg font-lato`}>
                                <p>{item}</p>
                            </div>
                        </Slide>
                    );
                })}
            </Slider>}

        </div>
    );
};


export const divList = (dt: string, dd: string, additional?: string) => {
    return <div className={`flex gap-1 ${additional ? additional : ""}`}>
        <dt className="font-thin">{dt}</dt>
        <dd className="font-bold text-secondary-500">{dd}</dd>
    </div>
}