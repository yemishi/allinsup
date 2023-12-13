import { PanInfo, motion, Variants } from "framer-motion"
import { useState, useRef } from "react"
import CartProducts from "./CartProducts"

import { useGlobalState } from "../../App"

interface PropsType {
    cartOpen: boolean,
    handleClose: () => void
}

export default function CartPanel({ cartOpen, handleClose }: PropsType) {
    const [directionDrag, setDirectionDrag] = useState<string>('-100%')
    const { cart } = useGlobalState()

    const [headerPosition, setHeaderPosition] = useState<boolean>(false)
    const isMobileDevice: boolean = window.innerWidth <= 768

    const variants: Variants = {
        open: { x: 0 },
        close: { x: directionDrag }
    }
    const initialScrollValue = useRef<number>(0);

    const handleDragEnd = async (event: any, info: PanInfo) => {
        if (info.offset.x < -180) handleClose();
        if (info.offset.x > 180) {
            setDirectionDrag('100%');
            handleClose();
            setTimeout(() => {
                setDirectionDrag('-100%');
            }, 700);
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const { scrollTop } = target;

        if (scrollTop > initialScrollValue.current) {
            setHeaderPosition(false);
        } else {
            setHeaderPosition(true);
        }
        initialScrollValue.current = scrollTop;
    };

    const headVariant: Variants = {
        sticky: { top: 0, position: 'sticky', transition: { type: 'spring', damping: 20, stiffness: 100 } },
        noSticky: { top: '-100px', position: 'sticky', transition: { type: 'spring', damping: 20, stiffness: 100 }, }
    }

    return (
        <motion.div onClick={(e) => e.stopPropagation()} onScroll={handleScroll} drag={isMobileDevice ? "x" : false} dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8} onDragEnd={handleDragEnd} variants={variants} animate={cartOpen ? "open" : 'close'} initial={'close'} transition={{ type: "just" }}
            className=" h-full scrollBar relative overflow-auto min-[450px]:w-[450px]  flex flex-col bg-[#161616] text-white font-lato ">

            <motion.div
                variants={headVariant} transition={{ type: "spring", damping: 10, stiffness: 100 }}
                animate={headerPosition ? "sticky" : 'noSticky'} onClick={() => setHeaderPosition(!headerPosition)}
                className="w-full flex top-0 justify-between  p-5 h-[83px] bg-primary rounded-b-xl">
                <p className="mt-auto  font-bold text-xl">Carrinho de Compras</p>

                <div onClick={handleClose} className="w-7 self-end">
                    <svg className="stroke-white hover:stroke-black cursor-pointer" viewBox="0 0 15 15" fill="none"
                        xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" ></g>
                        <g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
                        ></path> </g></svg>
                </div>
            </motion.div>

            {cart.length > 0 ? <CartProducts /> : <div className="p-5"><p>O seu carrinho está vazio</p></div>}

        </motion.div>

    )

}