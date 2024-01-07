import { motion } from 'framer-motion'
import DeleteUser from "./DeleteUser"
import { Dispatch, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { useGlobalState } from "../../App"

export default function Logout({ tel, setIsAuth }: { tel: string, setIsAuth: Dispatch<React.SetStateAction<boolean>> }) {
    const { dispatch } = useGlobalState()
    const handleLogout = useCallback(() => {
        localStorage.removeItem("tel")
        setIsAuth(false);
    }, [setIsAuth]);

    const [deleteUser, setDeleteUser] = useState<boolean>(false)

    return (
        <motion.div onClick={() => dispatch({ type: "SET_USER_OPEN", payload: false })} className="backdrop-brightness-50 h-full w-full items-start flex left-0 top-0 absolute z-30">
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ y: "-100%" }} animate={{ y: 0 }} className="text-white flex flex-col gap-11 bg-primary sticky top-0 w-full pt-2 rounded-br-lg">
                <span className="self-center border-b border-emerald-300 p-1">
                    <p className="text-emerald-500  font-thin font-anton ">{tel}</p>
                </span>
                <button className="self-end p-2 rounded-bl-lg  bg-secondary-700">Testit</button>
                <span className="flex justify-between  font-bold  font-lato">
                <button className="self-end p-2 rounded-bl-lg  bg-secondary-500">Testit2</button>

                    <button onClick={() => setDeleteUser(true)} className="self-end p-2 rounded-bl-lg  bg-secondary-700">
                        Excluir conta
                    </button>
                    <Link to="/myOrders" onClick={() => dispatch({ type: "SET_USER_OPEN", payload: false })} className="self-end p-2   bg-secondary-700">
                        Meus pedidos
                    </Link>
                    <button onClick={handleLogout} className="self-end p-2 rounded-br-lg bg-secondary-700">
                        Desconectar
                    </button>
                </span>
            </motion.div>
            {deleteUser && <DeleteUser setDeleteUser={setDeleteUser} setIsAuth={setIsAuth} />}
        </motion.div>
    )
}


