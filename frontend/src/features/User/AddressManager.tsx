import { useState, useEffect } from "react"
import { useGlobalState } from "../../App"
import { DivDraggable } from "../../components"
import { logoCloseEvent } from "../../utils/helpers"
import { AddressType } from "../../types"
import loginRequest from "./services/axios.config"
import { toast } from "../../components"

export default function AddressManager() {

    interface ErrorsType {
        cep?: string,
    }

    const { dispatch, state } = useGlobalState()

    const [form, setForm] = useState<AddressType>({ tel: '', name: '', cep: '', address: '', state: '', city: '', houseNumber: '' });
    const [errors, setErrors] = useState<ErrorsType>({})

    const [isExisting, setIsExisting] = useState<boolean>(true)
    const [directionDrag, setDirectionDrag] = useState<"100%" | "-100%">("100%")

    useEffect(() => {
        const fetchData = async () => {
            const tel = localStorage.getItem("tel")
            if (tel) setForm({ ...form, tel })
        }
        fetchData()
    }, [state.userOpen])

    const handleClose = () => {
        setIsExisting(false);
        setTimeout(() => {
            dispatch({ type: "SET_ADDRESS_OPEN", payload: false })
            setIsExisting(true)
        }, 700);
    }

    const errorsCount = Object.values(errors).length;

    const handleCepValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value.replace(/\D/g, '');
        if (input.length >= 8) {
            const valueLeft = input.slice(0, 5)
            const valueRight = input.slice(5, 8)
            setForm({ ...form, cep: `${valueLeft}-${valueRight}` })
        } else setForm({ ...form, cep: input })
    };

    const removerError = (element: "cep") => {
        setErrors((prevErrors) => {
            const { [element]: removedError, ...rest } = prevErrors;
            return rest;
        });
    };

    const fetchAddressInfo = async () => {
        const cep = form.cep.replace('-', '');
        const response = await loginRequest.fetchAddressInfo(cep);

        if ('error' in response) {
            return setErrors({ ...errors, cep: "Introduza um CEP válido" });
        } else {
            const { localidade, uf } = response;

            if (!localidade || !uf) {
                return setErrors({ ...errors, cep: "Introduza um CEP válido" });
            } else {
                removerError("cep");
                const lowercaseLocalidade = localidade.toLowerCase();
                const lowercaseUF = uf.toLowerCase();

                if (!lowercaseLocalidade.includes("barra de santa rosa") || !lowercaseUF.includes("pb")) {
                    return setErrors({ ...errors, cep: "No momento não entregamos na sua área." });
                } else {
                    removerError("cep");
                    setForm({ ...form, state: uf, city: localidade });
                }
            }
        }
    };

    const handleFormValue = (element: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = element.target
        const { name } = element.target
        if (name === "houseNumber" && value.length > 10) {
            const truncatedValue = value.slice(0, 10);
            setForm({ ...form, [name]: Number(truncatedValue) });
        } else {
            setForm({ ...form, [name]: value });
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await loginRequest.updateUser(form)

        toast.promise(Promise.resolve(response), {
            pending: "Atualizando informações",
            success: "Informações atualizadas com sucesso!",
            error: "Algo deu errado ao tentar atualizar suas informações.",
        });
        handleClose()
    }

    const inputClass = `block py-2.5 ps-7 pe-0 w-full text-sm md:text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none
     focus:ring-0 focus:border-secondary-600 peer`

    const labelClass = `absolute text-sm md:text-base text-white text-opacity-50 duration-300 transform -translate-y-7 translate-x-1 scale-75 top-3 pointer-events-none origin-[0] 
     peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
     peer-focus:scale-75 peer-focus:-translate-y-7 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`

    return (
        <>
            {state.addressOpen && <div onClick={handleClose} className="h-screen items-center absolute w-full backdrop-brightness-50 flex flex-col z-30 ">

                <DivDraggable setState={setIsExisting} initialDirection="100%" setDirectionDrag={setDirectionDrag} closeParent={() => dispatch({ type: "SET_ADDRESS_OPEN", payload: false })}
                    directionDrag={directionDrag} state={isExisting} >

                    <div className="flex flex-col items-center gap-4 px-4 text-gray-200 py-3">
                        {logoCloseEvent(handleClose)}

                        <form onSubmit={handleSubmit} className="bg-primary-600 gap-8 w-full flex flex-col items-center p-3 pt-5 rounded-lg">
                            <p className="font-anton text-xl font-semibold text-secondary-100">Endereço de entrega</p>

                            {errors.cep && <p className="text-red-400  font-anton font-bold ">{errors.cep}</p>}

                            <div className="relative w-4/6">

                                <span className="absolute start-0 bottom-3 text-white ]">
                                    <svg className="w-6 h-6" fill="#ffffff" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><path d="M 28.0117 27.3672 C 33.0508 27.3672 37.3867 22.8672 37.3867 17.0078 C 37.3867 11.2187 33.0274 6.9297 28.0117 6.9297 C 22.9961 6.9297 18.6367 11.3125 18.6367 17.0547 C 18.6367 22.8672 22.9961 27.3672 28.0117 27.3672 Z M 13.2930 49.0703 L 42.7305 49.0703 C 46.4101 49.0703 47.7226 48.0156 47.7226 45.9531 C 47.7226 39.9062 40.1523 31.5625 28.0117 31.5625 C 15.8477 31.5625 8.2774 39.9062 8.2774 45.9531 C 8.2774 48.0156 9.5898 49.0703 13.2930 49.0703 Z"></path></g></svg>
                                </span>
                                <input type="text" name="name" className={inputClass} value={form.name} onChange={handleFormValue} placeholder=" " required />
                                <label className={labelClass}>Nome Completo</label>

                            </div>

                            <div className="relative w-4/6">
                                <span className="absolute start-0 bottom-3 text-white">
                                    <svg className="w-6 h-6" fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 256" stroke="#ffffff"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M79.73,1.5C36.8,1.5,2,36.29,2,79.23C2,90,4.24,102.96,8.16,112.3c18.08,43.13,71.57,141.2,71.57,141.2 s53.49-97.93,71.57-141.06c3.92-9.35,6.16-22.44,6.16-33.21C157.46,36.29,122.66,1.5,79.73,1.5z M117.12,76.01l-6.89-6.07V120h-61 V69.57l-6.69,6.07l-6.59-7.47l43.37-39.04l12.91,11.86V31h12v20.27l19.97,17.46L117.12,76.01z M87.23,98h-16V82h16V98z"></path> </g></svg>
                                </span>

                                <input type="text" onBlur={fetchAddressInfo} onChange={handleCepValue} value={form.cep} className={inputClass} placeholder=" " required />
                                <label className={labelClass}>Número do Cep</label>
                            </div>

                            <div className="relative w-4/6">

                                <span className="absolute start-0 bottom-3 text-white">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                    </svg>
                                </span>
                                <input type="text" readOnly value={form.tel} className={inputClass} placeholder=" " required />
                                <label className={labelClass}>Número do telefone</label>
                            </div>

                            <div className="relative w-4/6">

                                <span className="absolute start-0 bottom-3 text-white">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <g id="🔍-Product-Icons" stroke="none" fill="none"> <g id="ic_fluent_number_row_24_filled" fill="#ffffff"> <path d="M4.75,4 L8.75,4 C10.2687831,4 11.5,5.23121694 11.5,6.75 L11.5,17.25 C11.5,18.7687831 10.2687831,20 8.75,20 L4.75,20 C3.23121694,20 2,18.7687831 2,17.25 L2,6.75 C2,5.23121694 3.23121694,4 4.75,4 Z M6,9 L6,15 C6,15.4142136 6.33578644,15.75 6.75,15.75 C7.16421356,15.75 7.5,15.4142136 7.5,15 L7.5,9 C7.5,8.58578644 7.16421356,8.25 6.75,8.25 C6.33578644,8.25 6,8.58578644 6,9 Z M15.25,4 L19.25,4 C20.7687831,4 22,5.23121694 22,6.75 L22,17.25 C22,18.7687831 20.7687831,20 19.25,20 L15.25,20 C13.7312169,20 12.5,18.7687831 12.5,17.25 L12.5,6.75 C12.5,5.23121694 13.7312169,4 15.25,4 Z M17.5,9.75 L17.5,11.25 L16.25,11.25 C15.8357864,11.25 15.5,11.5857864 15.5,12 L15.5,15 C15.5,15.4142136 15.8357864,15.75 16.25,15.75 L18.25,15.75 C18.6642136,15.75 19,15.4142136 19,15 C19,14.5857864 18.6642136,14.25 18.25,14.25 L17,14.25 L17,12.75 L18.25,12.75 C18.6642136,12.75 19,12.4142136 19,12 L19,9 C19,8.58578644 18.6642136,8.25 18.25,8.25 L16.25,8.25 C15.8357864,8.25 15.5,8.58578644 15.5,9 C15.5,9.41421356 15.8357864,9.75 16.25,9.75 L17.5,9.75 Z" id="🎨-Color"> </path> </g> </g> </g></svg>
                                </span>
                                <input type="number" onChange={handleFormValue} name="houseNumber" value={form.houseNumber} className={inputClass} placeholder=" " required />
                                <label className={labelClass}>Número da residência</label>
                            </div>

                            <div className="relative w-4/6">
                                <span className="absolute start-0 bottom-3 text-white">
                                    <svg className="w-6 h-6 fill-white" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <style type="text/css">   </style> <g> <path d="M395.141,193.75V90.781h-47.703v55.266l-53.375-53.391L256,54.625l-38.063,38.031L0,310.609l38.063,38.063 l41.813-41.828v150.531h352.25V306.844l41.813,41.828L512,310.609L395.141,193.75z M245.578,396.719h-54.484v-54.5h54.484V396.719z M245.578,321.063h-54.484v-54.5h54.484V321.063z M320.906,396.719h-54.484v-54.5h54.484V396.719z M320.906,321.063h-54.484v-54.5 h54.484V321.063z"></path> </g> </g></svg>
                                </span>
                                <input type="text" onChange={handleFormValue} name="address" value={form.address} className={inputClass} placeholder=" " required />
                                <label className={labelClass}>Endereço</label>
                            </div>

                            <div className="relative w-4/6">
                                <span className="absolute start-0 bottom-3 text-white">
                                    <svg className="w-6 h-6" fill="#ffffff" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M9 4L9 21L18 21L18 27L23 27L23 4L9 4 z M 12.859375 8L14.900391 8L14.900391 10.015625L12.859375 10.015625L12.859375 8 z M 16.900391 8L18.859375 8L18.859375 10.015625L16.900391 10.015625L16.900391 8 z M 34 8L34 46L40.039062 46L40.039062 41.992188L42 41.992188L42 46L48 46L48 8L34 8 z M 12.859375 11.984375L14.900391 11.984375L14.900391 14L12.859375 14L12.859375 11.984375 z M 16.900391 11.984375L18.859375 11.984375L18.859375 14L16.900391 14L16.900391 11.984375 z M 42 11.992188L44 11.992188L44 14.007812L42 14.007812L42 11.992188 z M 38 12.007812L40 12.007812L40 14.021484L38 14.021484L38 12.007812 z M 37.960938 16L40 16L40 18.015625L37.960938 18.015625L37.960938 16 z M 42 16L44 16L44 18.015625L42 18.015625L42 16 z M 37.960938 19.984375L40 19.984375L40 22L37.960938 22L37.960938 19.984375 z M 42 19.984375L44 19.984375L44 22L42 22L42 19.984375 z M 2 22.992188L2 46L8 46L8 41.992188L10 42L10 46L16 46L16 22.992188L2 22.992188 z M 37.960938 23.992188L40 23.992188L40 26.007812L37.960938 26.007812L37.960938 23.992188 z M 42 23.992188L44 23.992188L44 26.007812L42 26.007812L42 23.992188 z M 6 25.992188L8.0390625 25.992188L8.0390625 28.007812L6 28.007812L6 25.992188 z M 10 25.992188L12 25.992188L12 28.007812L10 28.007812L10 25.992188 z M 37.960938 27.976562L40 27.976562L40 29.992188L37.960938 29.992188L37.960938 27.976562 z M 42 27.976562L44 27.976562L44 29.992188L42 29.992188L42 27.976562 z M 18 29L18 46L24 46L24.039062 41.992188L26 41.992188L26 46L32 46L32 29L18 29 z M 6 29.976562L8.0390625 29.976562L8.0390625 31.992188L6 31.992188L6 29.976562 z M 10 29.976562L12 29.976562L12 31.992188L10 31.992188L10 29.976562 z M 38 31.984375L40.039062 31.984375L40.039062 34L38 34L38 31.984375 z M 42 31.984375L44 31.984375L44 34L42 34L42 31.984375 z M 22 32L24 32L24 34.015625L22 34.015625L22 32 z M 26.039062 32.007812L28 32.007812L28 34.021484L26.039062 34.021484L26.039062 32.007812 z M 6 33.992188L8.0390625 33.992188L8.0390625 36.007812L6 36.007812L6 33.992188 z M 10 33.992188L12 33.992188L12 36.007812L10 36.007812L10 33.992188 z M 37.960938 35.984375L40 35.984375L40 38L37.960938 38L37.960938 35.984375 z M 42 35.984375L44 35.984375L44 38L42 38L42 35.984375 z M 26.039062 35.992188L28 35.992188L28 38.007812L26.039062 38.007812L26.039062 35.992188 z M 22 36L24 36L24 38.015625L22 38.015625L22 36 z"></path></g></svg>
                                </span>
                                <input type="text" name="city" readOnly value={form.city} className={`${inputClass} pointer-events-none`} placeholder=" " required />
                                <label className={labelClass}>Cidade</label>
                            </div>

                            <div className="relative w-4/6">
                                <span className="absolute start-0 bottom-3 text-white">
                                    <svg className="w-6 h-6" fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="#ffffff"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="288,136 288,72 80,72 80,328 288,328 288,392 512,392 512,136 "></polygon> </g> </g> <g> <g> <rect y="24" width="48" height="464"></rect> </g> </g> </g></svg>
                                </span>
                                <input type="text" name="state" readOnly value={form.state} className={`${inputClass} pointer-events-none`} placeholder=" " required />
                                <label className={labelClass}>Estado</label>
                            </div>

                            <div className="relative">

                                <textarea name="complement" cols={30} rows={6} className=" p-3 block text-white bg-primary-500 rounded-md border-0 border-b-2 border-gray-300 appearance-none focus:outline-none
                                     focus:ring-0 focus:border-secondary-600 peer resize-none" placeholder=" " />
                                <label className='absolute text-base text-white text-opacity-50 duration-300 transform -translate-y-9 translate-x-1 scale-75 top-3 pointer-events-none  
                                peer-placeholder-shown:start-0  peer-focus:start-0 peer-focus:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                               peer-focus:scale-75 peer-focus:-translate-y-9'>Complemento</label>
                            </div>
                            <button className={`bg-secondary-700 p-2 w-2/4 font-semibold rounded font-anton ${errorsCount > 0 ? "pointer-events-none bg-opacity-10" : ""} `} type="submit">Submit</button>
                        </form>
                    </div>
                </DivDraggable >
            </div >}
        </>
    )
}