
import { useGlobalState } from "../../App"
import { useEffect, useState } from "react"
import { axiosRequest } from "../../components"
import { AddressType } from "../../types"

export default function Address() {
    const { dispatch, state } = useGlobalState()
    const [currentAddress, setCurrentAddress] = useState<AddressType>()

    useEffect(() => {
        const fetchData = async () => {
            const tel = localStorage.getItem("tel") as string
            const response = await axiosRequest.getUser(tel)
            const { address } = response.data
            setCurrentAddress(address)
        }
        fetchData()

    }, [state.addressOpen])

    return (
        <div className="flex flex-col items-center p-6 gap-4 lg:gap-11">
            <span className="font-anton text-xl text-left self-start text-gray-200 md:self-center lg:text-2xl">
                Endereço de entrega
            </span>
            <div className="flex flex-col items-center text-white bg-primary-600 p-6 gap-4 border border-primary-200 ">
                {currentAddress ? <div className="flex w-full flex-col gap-6">
                    <ul className="font-lato flex flex-col lg:gap-2 lg:text-lg">
                        <li>{currentAddress.name}</li>
                        <li>{currentAddress.city}, {currentAddress.address} N°{currentAddress.houseNumber}</li>
                        <li>{currentAddress.cep} {currentAddress.state}</li>
                        <li>{currentAddress.tel} </li>
                    </ul>
                    <button className="cursor-pointer border-b leading-4 self-center lg:text-lg text-secondary-200 border-secondary-200 font-lato font-semibold"
                        onClick={() => dispatch({ type: "SET_ADDRESS_OPEN", payload: true })}>
                        Modificar Endereço de entrega
                    </button>

                </div> : <div className="flex flex-col w-full items-start rounded-md gap-7 lg:text-lg lg:py-5 lg:gap-10">
                    <p className="font-anton text-red-400">É preciso adicionar um endereço de entrega.</p>
                    <button onClick={() => dispatch({ type: "SET_ADDRESS_OPEN", payload: true })} className="cursor-pointer border-b leading-4 self-center
                 text-secondary-200 border-secondary-200 font-lato font-semibold " >Adicionar</button>
                </div>}
            </div>
        </div>
    )
}