import { Dispatch, SetStateAction } from "react";
import { Slide, Slider, SliderProps } from "../components"
import { ProductType, SizesType, VariantType } from "../types"
import { motion } from 'framer-motion'

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
                <p className="font-thin">{title}</p>
                <p className="text-secondary-200">{array[state][selected]}</p>
            </span>
            <Slider settings={settingsOptions}>
                {(array).map((e, i) => {
                    const item = e[selected]
                    return (
                        <Slide key={`${e}-${i}`} className={`!w-auto`} onClick={() => setState(i)}>
                            <div className={`!w-auto border-2 cursor-pointer text-sm ${classActive(state, i)} font-semibold p-2 rounded-lg font-lato`}>
                                <p>{item}</p>
                            </div>
                        </Slide>
                    );
                })}
            </Slider>
        </div>
    );
};


