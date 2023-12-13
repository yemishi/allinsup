import RoundedSlider from "./RoundedSlider";

interface ChildrenType {
    name: string,
    banner: string
}

interface PropsType {
    children: ChildrenType[]
}
export { RoundedSlider }

export type { PropsType, ChildrenType }