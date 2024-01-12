import { useState } from "react"
import { useGlobalState } from "../../App"
import { DivDraggable, toast } from "../../components"
import { motion } from "framer-motion"
import BrandMenu from "./BrandMenu"
import CategoryMenu from "./CategoryMenu"
import { useNavigate } from "react-router-dom"
import DeleteUser from "../User/DeleteUser"

export default function BurgerMenu() {
    const { state, dispatch } = useGlobalState()
    const [directionDrag, setDirectionDrag] = useState<"100%" | "-100%">("-100%")
    const [isExisting, setIsExisting] = useState<boolean>(true);
    const navigate = useNavigate()

    const [isLogged, setIsLogged] = useState<boolean>(localStorage.getItem('tel') ? true : false)
    const [deleteUser, setDeleteUser] = useState<boolean>(false)

    const variantsParent = {
        open: { opacity: 1 },
        exit: { opacity: 0, transition: { delay: 0.3 } }
    }
    const closeBurger = () => dispatch({ type: "SET_BURGER_OPEN", payload: false })

    const closeEvent = () => {
        setIsExisting(false);
        setTimeout(() => {
            closeBurger()
            setIsExisting(true)
        }, 700);
    }
    const login = () => {

        if (!isLogged) {
            dispatch({ type: "SET_USER_OPEN", payload: true })
            closeBurger()
            setIsLogged(true)
            return
        }
        localStorage.removeItem("tel")
        setIsLogged(false)
        toast.warn("Usuario desconectado")

    }

    return (
        <>
            {state.burgerOpen && <motion.div onClick={closeEvent} variants={variantsParent} animate={isExisting ? 'open' : 'exit'}
                className="w-screen z-30 left-0 h-full overflow-hidden fixed backdrop-brightness-50 flex flex-col ">
                <DivDraggable directionDrag={directionDrag} state={isExisting} setState={setIsExisting} setDirectionDrag={setDirectionDrag}
                    classAddition="!self-start" initialDirection={"-100%"} closeParent={() => dispatch({ type: "SET_BURGER_OPEN", payload: false })}>

                    <div className="w-full flex top-0 justify-between z-10 p-5 h-[83px] bg-secondary rounded-b-xl">
                        <p className="mt-auto font-semibold text-lg font-anton">Pegue um atalho</p>

                        <div className="ml-auto mb-auto   flex gap-1 ">
                            <p className="font-anton text-base mt-auto  self-center">{isLogged ? "Sair" : "Entrar"}</p>
                            <button className="w-7 self-center" onClick={login}>
                                <svg className="stroke-[4px] stroke-white" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke="#000000" fill="none"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"  ></g><g id="SVGRepo_iconCarrier"><circle cx="32" cy="18.14" r="11.14"></circle><path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"></path></g></svg>      </button>
                        </div>
                    </div>

                    <div onClick={() => { closeBurger(), navigate("/") }} className="p-4 flex items-center border-b-2 border-primary-200 w-full cursor-pointer hover:bg-primary-400 duration-300">
                        <h2 className="text-base font-anton font-semibold self-end">Ir para a pagina inicial</h2>
                        <svg className="stroke-2 ml-auto h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M22 22L2 22" stroke="#ffffff"></path> <path d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486" stroke="#ffffff"></path> <path d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5" stroke="#ffffff" ></path> <path d="M4 22V9.5" stroke="#ffffff" ></path> <path d="M20 9.5V13.5M20 22V17.5" stroke="#ffffff" ></path> <path d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17" stroke="#ffffff" ></path> <path d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z" stroke="#ffffff" ></path> </g></svg>
                    </div>

                    <div onClick={() => { closeBurger(), navigate('/myOrders') }} className="p-4 flex items-center border-b-2 border-primary-200 w-full cursor-pointer hover:bg-primary-400 duration-300">
                        <h2 className="text-base font-anton font-semibold self-end">Meus pedidos</h2>
                        <svg viewBox="0 0 24 24" className='fill-white stroke-slate-900 w-7 ml-auto' xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <defs>  </defs> <g id="reciept"> <line x1="8.18" y1="9.16" x2="12.95" y2="9.16"></line> <line x1="8.18" y1="12.98" x2="12.95" y2="12.98"></line> <line x1="8.18" y1="16.8" x2="12.95" y2="16.8"></line> <path d="M19.64,22.52H4.36A2.86,2.86,0,0,1,1.5,19.66V2.48L4,4.39,6.59,2.48,9.13,4.39l2.55-1.91,2.54,1.91,2.55-1.91V19.66a2.87,2.87,0,0,0,2.87,2.86Z"></path> <line x1="4.36" y1="9.16" x2="6.27" y2="9.16"></line> <line x1="4.36" y1="12.98" x2="6.27" y2="12.98"></line> <line x1="4.36" y1="16.8" x2="6.27" y2="16.8"></line> <path d="M18.68,10.11H22.5v9.55a2.87,2.87,0,0,1-5.73,0V10.11h1.91Z"></path> </g> </g>
                        </svg>
                    </div>
                    <CategoryMenu handleClose={closeEvent} />
                    <BrandMenu handleClose={closeEvent} />

                    <div onClick={() => setDeleteUser(true)} className="p-4 flex items-center w-full border-t-2 border-primary-200 cursor-pointer hover:bg-red-600 duration-200 mt-auto">
                        <h2 className="text-base font-anton font-semibold self-end">Excluir perfil</h2>
                    </div>
                </DivDraggable>
                {deleteUser && <DeleteUser setDeleteUser={setDeleteUser} setIsAuth={setIsLogged} />}
            </motion.div>}
        </>
    )

}