import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center text-center min-w-full justify-center bg-primary text-white absolute z-50">
            <div className=" p-8 rounded-lg shadow-md ">
                <h1 className='text-3xl font-bold font-lato text-secondary-200'>Perdido na Fronteira dos Mundos</h1>

                <p className="text-gray-500 px-6 my-6">
                    Algo deu errado! O portal para a página solicitada foi encerrado por forças desconhecidas. Talvez seja hora de voltar para casa.
                </p>
                <Link to="/" className="bg-primary-400 font-anton text-gray-200 hover:bg-primary-500 duration-200 font-bold py-3 px-5 rounded">
                    Retornar à Base
                </Link>
            </div>
        </div>
    );
};