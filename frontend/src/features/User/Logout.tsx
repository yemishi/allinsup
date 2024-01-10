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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => dispatch({ type: "SET_USER_OPEN", payload: false })}
            className="backdrop-brightness-50 h-full w-full items-start flex left-0 top-0 absolute z-30">

            <div onClick={(e) => e.stopPropagation()} className="text-white flex flex-col shadow-2xl shadow-primary-300
             gap-4 bg-primary sticky top-0 w-full pt-2 rounded-br-lg md:w-60">

                <span className="self-center border-b border-emerald-300 p-1 md:pb-4 text-emerald-500 font-thin font-anton md:text-gray-300 md:text-lg
                 md:border-primary-200 md:w-full text-center">
                    <p className="">{tel}</p>
                </span>

                <div className="flex justify-between mt-6 md:mt-0 font-semibold md:items-start font-lato md:flex-col text-gray-300  ">

                    <span className="p-2 md:p-3 md:flex gap-2 items-center md:hover:bg-red-800 hover:bg-opacity-60 md:w-full rounded-bl-lg
                    cursor-pointer bg-secondary-700 md:bg-transparent">
                        <svg className='hidden md:block w-7' fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><path d="M1,20a1,1,0,0,0,1,1h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5Zm12.707,9.707L20.414,17l2.293,2.293a1,1,0,1,1-1.414,1.414L19,18.414l-2.293,2.293a1,1,0,0,1-1.414-1.414L17.586,17l-2.293-2.293a1,1,0,0,1,1.414-1.414L19,15.586l2.293-2.293a1,1,0,0,1,1.414,1.414Z"></path></g></svg>
                        <button onClick={() => setDeleteUser(true)} className=" ">
                            Excluir conta
                        </button>
                    </span>

                    <span onClick={() => dispatch({ type: "SET_ADDRESS_OPEN", payload: true })} className="hidden p-2 md:p-3 md:flex gap-2 
                    items-center md:hover:bg-sky-600 hover:bg-opacity-60 w-full cursor-pointer">
                        <svg viewBox="0 0 1024 1024" className='hidden md:block  w-7' version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><path d="M988.598857 118.418286l7.094857 5.339428a25.307429 25.307429 0 0 1 4.681143 35.84l-374.125714 494.445715a71.094857 71.094857 0 0 1-28.233143 21.211428l-150.893714 54.125714c-14.409143 5.193143-26.916571-3.949714-26.550857-19.017142l3.876571-158.573715a61.074286 61.074286 0 0 1 11.629714-32.256L822.418286 23.332571c8.045714-10.24 24.064-12.434286 34.816-4.315428l131.364571 99.401143z m-497.883428 544.182857l90.697142-32.621714 276.187429-362.422858c6.070857-8.045714 4.900571-18.432-2.925714-24.137142l-76.288-55.808c-7.972571-5.851429-18.066286-3.437714-23.990857 4.096L479.817143 544.182857a35.986286 35.986286 0 0 0-7.241143 19.894857l-2.048 84.187429c-0.292571 11.410286 9.874286 18.066286 20.260571 14.336z m311.588571-533.796572a16.310857 16.310857 0 0 0 2.925714 23.552l75.264 54.930286a16.457143 16.457143 0 0 0 23.259429-3.657143l32.475428-42.861714c5.924571-7.899429 3.657143-18.285714-4.022857-24.137143l-71.533714-54.125714a17.334857 17.334857 0 0 0-24.356571 2.706286l-33.938286 43.593142z m148.845714 680.301715a164.132571 164.132571 0 0 1-164.352 164.278857H148.845714A131.291429 131.291429 0 0 1 18.285714 841.654857V187.977143c0-47.835429 38.473143-86.381714 86.601143-86.381714h494.006857c18.651429 0 33.792 15.286857 33.792 34.084571a33.938286 33.938286 0 0 1-33.792 34.084571H131.657143c-0.292571 0-0.292571 0-0.292572-19.309714l0.292572 19.309714c-22.674286 0-45.787429 27.501714-45.787429 51.346286v620.544c0 34.962286 28.306286 63.488 62.902857 63.488h628.077715c58.953143 0 106.715429-47.469714 106.715428-105.837714V470.747429c0-18.797714 15.067429-34.084571 33.792-34.084572s33.792 15.36 33.792 34.157714v338.285715z" fill="#ffffff"></path></g></svg>
                        <p>
                            Alterar endereço
                        </p>
                    </span>

                    <Link to="/myOrders" onClick={() => dispatch({ type: "SET_USER_OPEN", payload: false })} className=" bg-sky-600 p-2 md:p-3 md:bg-transparent md:flex gap-2 
                    items-center cursor-pointer md:hover:bg-sky-600 hover:bg-opacity-60 md:w-full">
                        <svg className='hidden md:block w-8 ' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <rect x="5" y="4" width="14" height="17" rx="2" stroke="#ffffff"></rect> <path d="M9 9H15" stroke="#ffffff"></path> <path d="M9 13H15" stroke="#ffffff" ></path> <path d="M9 17H13" stroke="#ffffff" ></path> </g></svg>
                        <p>
                            Meus pedidos
                        </p>
                    </Link>

                    <span onClick={handleLogout} className="p-2 md:p-3 md:flex gap-2 items-center md:hover:bg-red-600 hover:bg-opacity-60 md:w-full
                     rounded-bl-lg bg-secondary-700 cursor-pointer md:bg-transparent">
                        <svg className='hidden md:block w-8 stroke-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#ffffff" ></path> <path d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="#ffffff" ></path> </g></svg>
                        <p>
                            Desconectar
                        </p>
                    </span>
                </div>
            </div>
            {deleteUser && <DeleteUser setDeleteUser={setDeleteUser} setIsAuth={setIsAuth} />}
        </motion.div>
    )
}


