import { motion } from 'framer-motion'
import { Dispatch } from 'react'
import { toast } from '../../components'
import loginRequest from './services/axios.config'

export default function DeleteUser({ setDeleteUser, setIsAuth }: { setDeleteUser: Dispatch<React.SetStateAction<boolean>>, setIsAuth: Dispatch<React.SetStateAction<boolean>> }) {
    const handleDelete = async () => {
        try {
            const response = await loginRequest.deleteUser();
            toast.promise(Promise.resolve(response), {
                pending: "Deletando informações do usuário.",
                success: "Usuário deletado com sucesso!",
                error: "Não foi possível deletar as informações do usuário"
            });
            localStorage.removeItem("tel")
            setIsAuth(false);
            setDeleteUser(false)
        } catch (error) {
            toast.error("Ocorreu um erro ao deletar o usuário");
        }
    };

    return (
        <motion.div onClick={(e) => { e.stopPropagation(), setDeleteUser(false) }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className='absolute flex items-start h-full w-full bg-black bg-opacity-50 md:justify-center md:items-center'>
            <div onClick={(e) => e.stopPropagation()} className='bg-primary text-white p-6 flex flex-col gap-4 font-anton h-64 w-full md:w-auto md:rounded-lg'>
                <span className=' text-center font-semibold text-xl lg:text-2xl'>Voce tem certeza que deseja excluir sua conta ?</span>
                <span className='grid grid-cols-2 self-center gap-8 mt-auto lg:text-base w-[80%]'>
                    <button onClick={() => setDeleteUser(false)} className='p-3 hover:scale-105 duration-300 bg-red-500 hover:bg-red-600 font-bold font-lato rounded-lg'>
                        Não
                    </button>
                    <button onClick={handleDelete} className='p-3 hover:scale-105 duration-300  bg-emerald-600 hover:bg-emerald-700 font-bold font-lato rounded-lg'>
                        Sim
                    </button>
                </span>
            </div>
        </motion.div>
    )
}