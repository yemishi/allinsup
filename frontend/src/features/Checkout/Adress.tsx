
import { useGlobalState } from "../../App"
import { lazy, useEffect, useState } from "react"
import loginRequest from "../User/services/axios.config"
import { alert } from "../../components"
import { AddressType } from "../../types"


export default function Address() {
    const { addressOpen } = useGlobalState()
    const [currentAddress, setCurrentAddress] = useState<AddressType>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await loginRequest.checkAuth()
            if (!response.isAuthenticated) return
            const { address } = response.user
            setCurrentAddress(address)
        }
        fetchData()
    }, [])

    return (
        <>
            siuuuu address
        </>
    )
}