import loginRequest from "./services/axios.config"
import { alert } from "../../components"
import { motion } from 'framer-motion'
import DeleteUser from "./DeleteUser"
import { Dispatch, useState } from "react"
import { useGlobalState } from "../../App"
export default function Logout({ tel, setIsAuth }: { tel: string, setIsAuth: Dispatch<React.SetStateAction<boolean>> }) {
    const { setUserOpen } = useGlobalState()
    const handleLogout = async () => {
        try {
            const response = await loginRequest.logout()
            alert(response,{variant:"success"})
            setIsAuth(false)
        } catch (error) {
            alert("algo deu errado, tente novamnte", { variant: "error" })
        }
    }
    const [deleteUser, setDeleteUser] = useState<boolean>(false)

    return (
        <motion.div onClick={() => setUserOpen(false)} className="backdrop-brightness-50 h-full w-full items-start flex left-0 top-0  absolute z-30">
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ y: "-100%" }} animate={{ y: 0 }} className="text-white flex flex-col gap-11 bg-primary w-full pt-2 rounded-br-lg">
                <span className="self-center border-b border-emerald-300 p-1">
                    <p className="text-emerald-500  font-thin font-anton ">{tel}</p>
                </span>
                <span className="flex justify-between  font-bold  font-lato">

                    <button onClick={() => setDeleteUser(true)} className="self-end p-2 rounded-bl-lg  bg-secondary-700">
                        excluir conta
                    </button>
                    <button onClick={handleLogout} className="self-end p-2 rounded-br-lg bg-secondary-700">
                        Desconectar
                    </button>
                </span>
            </motion.div>
            {deleteUser && <DeleteUser setDeleteUser={setDeleteUser} setIsAuth={setIsAuth} />}
        </motion.div>
    )
}