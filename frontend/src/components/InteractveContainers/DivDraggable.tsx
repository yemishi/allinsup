import { PanInfo, Variants, motion } from 'framer-motion'
import { Dispatch } from 'react';

interface PropsType {
    children: React.ReactNode;
    setParent: Dispatch<React.SetStateAction<boolean>>;
    setState: Dispatch<React.SetStateAction<boolean>>;
    state: boolean;
    setDirectionDrag: Dispatch<React.SetStateAction<"100%" | "-100%">>;
    directionDrag: '100%' | '-100%';
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
    initialDirection: '100%' | '-100%'
    classAddition?: string

}
export default function DivDraggable({ children, setParent, onScroll, setState, state, setDirectionDrag, directionDrag, initialDirection, classAddition }: PropsType) {

    const variants: Variants = {
        open: { x: 0 },
        close: { x: directionDrag }
    }
    const handleClose = () => {
        setState(false);
        setTimeout(() => {
            setParent(false);
            setState(true)
        }, 700);
    }

    const handleDragEnd = async (event: any, info: PanInfo) => {
        if (info.offset.x < -180) {
            setDirectionDrag("-100%")
            handleClose()
        } else if (info.offset.x > 180) {
            setDirectionDrag("100%")
            handleClose();
        }

    };
    return <>
        <motion.div onScroll={onScroll} onClick={(e) => e.stopPropagation()} initial={{ x: initialDirection }} dragElastic={0.8} variants={variants} onDragEnd={handleDragEnd} animate={state ? "open" : 'close'} drag="x"
            className={`h-full ${classAddition||""} self-end scrollBar relative overflow-auto min-[450px]:w-[450px] w-full flex flex-col bg-primary-700 text-white font-lato`}
            transition={{ type: "just" }} dragConstraints={{ left: 0, right: 0 }} >
            {children}
        </motion.div>
    </>

}
