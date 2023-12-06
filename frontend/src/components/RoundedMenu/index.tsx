import RoundedMenu from "./RoundedMenu";

interface ChildrenType {
    name: string,
    color?: string,
    banner: string
}

interface PropsType {
    children: ChildrenType[]
}
export { RoundedMenu }

export type { PropsType, ChildrenType }