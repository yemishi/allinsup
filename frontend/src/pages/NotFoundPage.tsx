import { Link } from 'react-router-dom';
import { blinkVariant } from '../utils';
import { motion } from "framer-motion"

export default function NotFoundPage() {
    return (
        <motion.div animate="animate" exit="exit" initial="initial" transition={{ duration: 0.2 }} variants={blinkVariant} className="h-screen 
        flex items-center text-center w-full bg-primary justify-center text-white absolute self-center z-50">
            <div className=" p-8 rounded-lg shadow-md ">
                <h1 className='text-3xl font-bold font-lato text-secondary-200'>Perdido na Fronteira dos Mundos</h1>

                <p className="text-gray-500 px-6 my-6">
                    Algo deu errado! O portal para a página solicitada foi encerrado por forças desconhecidas. Talvez seja hora de voltar para casa.
                </p>
                <Link to="/" className="bg-primary-400 font-anton text-gray-200 hover:bg-primary-500 duration-200 font-bold py-3 px-5 rounded">
                    Retornar à Base
                </Link>
            </div>
        </motion.div>
    );
};