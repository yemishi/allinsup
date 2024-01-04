
import { useGlobalState } from "../../App"
import { lazy, useEffect, useState } from "react"
import loginRequest from "../User/services/axios.config"
import { axiosRequest } from "../../components"
import { parseLocalCurrency, totalAmount } from "../../utils"
import { AddressType } from "../../types"
import { Link } from "react-router-dom"


export default function Address() {
    const { dispatch, state } = useGlobalState()
    const [currentAddress, setCurrentAddress] = useState<AddressType>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosRequest.getUser()
            const { address } = response.data
            setCurrentAddress(address)
        }
        fetchData()

    }, [state.addressOpen])
    return (
        <div className="flex flex-col items-center text-gray-200 bg-primary-600 p-6 gap-4 ">
            <span className="font-anton text-xl text-left self-start">
                Endereço de entrega
            </span>
            {currentAddress ? <div className="flex  w-full flex-col gap-6 ">
                <ul className="font-lato">
                    <li>{currentAddress.name}</li>
                    <li>{currentAddress.city}, {currentAddress.address} N°{currentAddress.houseNumber}</li>
                    <li>{currentAddress.cep} {currentAddress.state}</li>
                </ul>
                <button className="cursor-pointer border-b leading-4 self-center text-secondary-200 border-secondary-200 font-lato font-semibold"
                    onClick={() => dispatch({ type: "SET_ADDRESS_OPEN", payload: true })}>
                    Modificar Endereço de entrega
                </button>
            </div> : <div className="flex flex-col w-full items-start rounded-md gap-7">
                <p className="font-anton text-red-400">É preciso adicionar um endereço de entrega.</p>
                <button onClick={() => dispatch({ type: "SET_ADDRESS_OPEN", payload: true })} className="cursor-pointer border-b leading-4 self-center
                 text-secondary-200 border-secondary-200 font-lato font-semibold" >Adicionar</button>
            </div>}
        </div>
    )
}