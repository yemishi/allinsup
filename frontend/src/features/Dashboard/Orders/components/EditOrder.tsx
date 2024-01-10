import { useQuery } from "react-query"
import { DivDraggable, axiosRequest, toast } from "../../../../components"
import { Dispatch, useState } from "react";
import { motion } from 'framer-motion'
import { ErrorPage, Loading } from "../../..";

interface PropsType {
    closeParent: () => void;
    setState: Dispatch<React.SetStateAction<boolean>>;
    state: boolean;
    setDirectionDrag: Dispatch<React.SetStateAction<"100%" | "-100%">>;
    directionDrag: '100%' | '-100%';
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
    classAddition?: string,
    orderId: string
}

export default function EditOrder({ orderId, closeParent, directionDrag, setDirectionDrag, setState, state, }: PropsType) {
    const variantsParent = {
        open: { opacity: 1 },
        exit: { opacity: 0, transition: { delay: 0.3 } }
    }
    const [newMethod, setNewMethod] = useState<string>()

    const { data, isLoading, error } = useQuery("order", async () => {
        const response = await axiosRequest.adminOrderInfo(orderId)
        setNewMethod(response.data.status)
        return response.data
    })

    if (isLoading) return <Loading />
    if (error || !data) return <ErrorPage />

    const { extra, products, status } = data
    const { paymentMethod } = extra

    const paymentMethods = {
        Pix: ["Encomendado", "Pago", "Preparando o produto", "Expedido", "Entregue"],
        default: ["Encomendado", "Preparando o produto", "Expedido", "Entregue"]
    };

    const getTrackingStage = (paymentMethod: "Dinheiro" | "Cartão de Crédito" | "Cartão de Débito" | "Pix") => {
        return paymentMethod === "Pix" ? paymentMethods[paymentMethod] : paymentMethods.default
    };

    const stages = getTrackingStage(paymentMethod)

    const handleUpdate = async () => {
        if (!newMethod) return
        try {
            await axiosRequest.updateOrder(orderId, { status: newMethod })
            toast.success("Pedido atualizado com sucesso!")
            closeParent()
        } catch (error) {
            toast.error("Falha ao tentar atualizar o pedido")
        }
    }
    return (
        <motion.div onClick={closeParent} animate={state ? "open" : "exit"} variants={variantsParent} className="flex md:justify-center flex-col w-full h-full fixed top-0 backdrop-brightness-50">
            <DivDraggable directionDrag={directionDrag} initialDirection="-100%" setDirectionDrag={setDirectionDrag} state={state} setState={setState}
             classAddition="md:w-auto md:h-auto md:self-center justify-self-center"    closeParent={closeParent}>

                <div className="flex flex-col gap-6 py-4 w-full    md:items-center">

                    <p className="font-bold text-lg font-anton text-sky-300">Produtos</p>

                    {products.map((product, index) => {
                        const { coverPhoto, name, productQtd, productPrice } = product

                        return <div key={`${product}_${index}`} className="flex object-hidden  relative bg-primary-500 w-full font-anton gap-4">
                            <span className="w-32  p-2 bg-white  rounded-l-md h-28">
                                <img src={coverPhoto} className="object-contain w-full h-full" alt="" />

                            </span>
                            <span className="flex p-2 justify-between w-full items-center self-start">
                                <p className="self-center  ">{name}</p>
                                <p className="text-secondary-200 font-bold self-start">{`${productQtd}x`}</p>
                            </span>
                            <p className="bottom-0 right-0 absolute text-secondary-600 font-bold p-2 bg-primary rounded-tl-lg">{productPrice}</p>
                        </div>
                    })}

                    <p className="font-bold text-lg font-anton text-sky-300">Estado da encomenda</p>

                    <div className='flex flex-col gap-7 after:h-[95%]  after:border after:absolute relative after:mt-2  after:ml-4 after:border-secondary-200  after:border-dashed   '>
                        {stages.map((stage, index) => {

                            const currentIndex = stages.indexOf(newMethod || status)

                            return <div key={`${stage}_${index}`} className='flex flex-row'>

                                <div className='flex font-medium  gap-2 items-center duration-300 w-full'>

                                    <span onClick={() => setNewMethod(stage)} className={`p-4 cursor-pointer rounded-full duration-300 border-2 border-primary-400 z-10 ${currentIndex >= index ? "bg-secondary-200 border-secondary-200 shadow-lightOn" :
                                        "bg-primary-600"} `} />
                                    <p className={`self-center ${currentIndex >= index ? "text-secondary-200" : "text-gray-400"}`}>{stage}</p>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
            </DivDraggable>
            <span className="w-full sticky z-30 bottom-0 flex gap">
                <button onClick={closeParent} className="p-2 flex-1 font-anton font-semibold bg-sky-600 ">Cancelar</button>
                <button onClick={handleUpdate} className="p-2 flex-1 font-anton font-semibold bg-secondary-600 ">Atualizar</button>
            </span>
        </motion.div>
    )
}