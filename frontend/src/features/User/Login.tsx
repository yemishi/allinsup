import { useState } from "react";
import { motion } from 'framer-motion'
import { useGlobalState } from "../../App";
import { alert, DivDraggable } from "../../components";
import { logoCloseEvent } from "../../utils/helpers";
import loginRequest from "./services/axios.config";

export default function Login() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [directionDrag, setDirectionDrag] = useState<'100%' | "-100%">('-100%')
    const [isExiting, setIsExiting] = useState(true);
    const { setUserOpen } = useGlobalState()

    const handlePhoneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const input = event.target.value.replace(/\D/g, '');
        let formattedNumber = '';

        if (input.length <= 2) {
            formattedNumber = input;
        } else if (input.charAt(2)) {
            formattedNumber = `(${input.slice(0, 2)}) `;
            if (input.length >= 3) {
                formattedNumber += `${input.slice(2, 3)} ${input.slice(3, 7)}`;
                if (input.length > 7) {
                    formattedNumber += `-${input.slice(7, 11)}`;
                }
            }
        } else {
            formattedNumber = `(${input.slice(0, 2)}) ${input.slice(2)}`;
        }

        formattedNumber = formattedNumber.slice(0, 18);
        setPhoneNumber(formattedNumber);
    };

    const handleClose = () => {
        setIsExiting(false);
        setTimeout(() => {
            setUserOpen(false);
            setIsExiting(true)
        }, 700);
    }


    const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await loginRequest.login(phoneNumber).then((res) => res)
        alert(response, { variant: "success" })
        handleClose()
    }

    return (<motion.div animate={isExiting ? { opacity: 1 } : { opacity: 0, transition: { delay: 0.3 } }} className="w-full z-30 h-screen overflow-hidden absolute backdrop-brightness-50 backdrop-blur-sm" >


        <DivDraggable classAddition="py-3 gap-7" initialDirection="-100%" directionDrag={directionDrag} setState={setIsExiting} state={isExiting} setDirectionDrag={setDirectionDrag} setParent={setUserOpen}>

            {logoCloseEvent(handleClose)}


            <div className=" text-white  w-full bg-primary-500 bg-opacity-90 flex flex-col gap-7 py-4 shadow-md shadow-primary-500">
                <h2 className="text-center font-anton text-xl font-bold">Iniciar Sessão</h2>

                <form onSubmit={submitLogin} className="max-w-xs mx-auto flex flex-col gap-8 w-full items-center">

                    <div className="relative">
                        <span className="absolute start-0 bottom-3 text-white">
                            <svg className="w-4 h-4 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                            </svg>
                        </span>

                        <input value={phoneNumber} onChange={handlePhoneInputChange} type="text" className="block py-2.5 ps-6 pe-0 w-full text-sm text-white
                     bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-secondary-500 focus:outline-none
                      focus:ring-0 focus:border-secondary-600 peer" pattern="\(\d{2}\) 9 \d{4}-\d{4}" placeholder=" " required title="O formato deve ser (XX) X XXXX-XXXX" />
                        <label className="absolute text-sm text-white text-opacity-50 duration-300 transform -translate-y-6 scale-75 top-3 pointer-events-none origin-[0] 
                        peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75
                         peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Insira seu número aqui</label>

                    </div>
                    <button type="submit" className="bg-secondary-700 w-4/6   mt-auto font-anton p-1 font-bold text-base rounded-md">Confirmar</button>
                </form>
            </div>
        </DivDraggable>

    </motion.div >
    )
}