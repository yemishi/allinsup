import { reloadPage } from "../../utils";

export default function ErrorPage() {

    return <div className="flex flex-col items-center gap-2 py-6 h-full  w-full text-gray-200">
        <svg className="w-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

            <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z" fill="#878787" />
            </g>

        </svg>
        <h1 className="text-xl mt-4 font-anton font-semibold text-center px-6">Não conseguimos buscar seus pedidos 😞</h1>

        <span className="my-10 w-full self-center flex flex-col gap-4 items-center">
            <p className="font-lato font-thin text-gray-400">Tente recarregar a pagina!</p>
            <button onClick={reloadPage} className="self-center bg-primary-200 p-2 font-anton font-bold rounded-md px-4">Recarregar</button>
        </span>
    </div>
}