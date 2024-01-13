import { PanInfo, Variants, motion } from 'framer-motion'
import { Dispatch } from 'react';

interface PropsType {
    children: React.ReactNode;
    closeParent: () => void;
    setState: Dispatch<React.SetStateAction<boolean>>;
    state: boolean;
    setDirectionDrag: Dispatch<React.SetStateAction<"100%" | "-100%">>;
    directionDrag: '100%' | '-100%';
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
    initialDirection: '100%' | '-100%'
    classAddition?: string

}
export default function DivDraggable({ children, closeParent, onScroll, setState, state, setDirectionDrag, directionDrag, initialDirection, classAddition }: PropsType) {

    const minTablet = window.matchMedia('(min-width: 768px)');

    const variants: Variants = {
        open: { x: 0 },
        close: { x: directionDrag }
    };

    const handleClose = () => {
        setState(false);
        setTimeout(() => {
            closeParent()
            setState(true)
        }, 700);
    };

    const handleDragEnd = async (_: any, info: PanInfo) => {
        if (info.offset.x < -150) {
            setDirectionDrag("-100%")
            handleClose()
        } else if (info.offset.x > 150) {
            setDirectionDrag("100%")
            handleClose();
        };

    };
    return <>
        <motion.div dragPropagation={false} onScroll={onScroll} onClick={(e) => e.stopPropagation()} initial={{ x: initialDirection }} variants={variants}
            animate={state ? "open" : 'close'}
            className={`h-full ${classAddition || ""}  self-end scrollBar w relative overflow-auto w-full min-[450px]:w-[450px] flex flex-col lg:min-w-[500px]
             bg-primary-700 text-white font-lato`}
            transition={{ type: "just" }}   {...(!minTablet.matches && {
                drag: "x",
                onDragEnd: handleDragEnd,
                dragElastic: 1,
                dragConstraints: { left: 0, right: 0 }
            })}>
            {children}
        </motion.div >
    </>

}
