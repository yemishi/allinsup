import { useGlobalState } from "../../App"

export default function Header() {
    const { setCartOpen, cart } = useGlobalState()
    return (
        <header className="w-full px-8 py-3">

            <div className="flex justify-between w-full relative">

                <img className="absolute left-0 top-0" src="" alt="" />
                <button className="w-9">
                    <svg className="fill-white hover:fill-[#fb923c]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g>
                        <g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier">
                            <path d="M16.0724 4.02447C15.1063 3.04182 13.7429 2.5 12.152 2.5C10.5611 2.5 9.19773 3.04182 8.23167 4.02447C7.26636 5.00636 6.73644 6.38891 6.73644 8C6.73644 10.169 7.68081 11.567 8.8496 12.4062C9.07675 12.5692 9.3115 12.7107 9.54832 12.8327C8.24215 13.1916 7.18158 13.8173 6.31809 14.5934C4.95272 15.8205 4.10647 17.3993 3.53633 18.813C3.43305 19.0691 3.55693 19.3604 3.81304 19.4637C4.06914 19.567 4.36047 19.4431 4.46375 19.187C5.00642 17.8414 5.78146 16.4202 6.98653 15.3371C8.1795 14.265 9.82009 13.5 12.152 13.5C14.332 13.5 15.9058 14.1685 17.074 15.1279C18.252 16.0953 19.0453 17.3816 19.6137 18.6532C19.9929 19.5016 19.3274 20.5 18.2827 20.5H6.74488C6.46874 20.5 6.24488 20.7239 6.24488 21C6.24488 21.2761 6.46874 21.5 6.74488 21.5H18.2827C19.9348 21.5 21.2479 19.8588 20.5267 18.2452C19.9232 16.8952 19.0504 15.4569 17.7087 14.3551C16.9123 13.7011 15.9603 13.1737 14.8203 12.8507C15.43 12.5136 15.9312 12.0662 16.33 11.5591C17.1929 10.462 17.5676 9.10016 17.5676 8C17.5676 6.38891 17.0377 5.00636 16.0724 4.02447ZM15.3593 4.72553C16.1144 5.49364 16.5676 6.61109 16.5676 8C16.5676 8.89984 16.2541 10.038 15.544 10.9409C14.8475 11.8265 13.7607 12.5 12.152 12.5C11.5014 12.5 10.3789 12.2731 9.43284 11.5938C8.51251 10.933 7.73644 9.83102 7.73644 8C7.73644 6.61109 8.18963 5.49364 8.94477 4.72553C9.69916 3.95818 10.7935 3.5 12.152 3.5C13.5105 3.5 14.6049 3.95818 15.3593 4.72553Z"
                            ></path> </g></svg>
                </button>

                <div className="text-white text-center">
                    <h1  className="font-montserrat text-lg  leading-4 border-y w-24 rounded-sm border-double border-secondary-200 p-1 font-extrabold ">ALL IN</h1>
                <p className="text-orange-400 text-[8px] font-mono font-semibold">SUPLEMENTOS</p>
                </div>

                <button className="w-8 relative" onClick={() => setCartOpen(true)}>
                    <svg style={{ strokeLinecap: 'round' }} className="stroke-white stroke-[1.5] hover:stroke-[#fb923c] duration-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g>
                        <g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier">
                            <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                            ></path>
                            <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                            ></path>
                            <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                            ></path> </g>
                    </svg>

                    <span className="bg-secondary-500 font-bold absolute top-1 font-lato text-xs text-white -right-1 rounded-full h-4 w-4 flex flex-center justify-center ">
                        {cart.length || 0}</span>
                </button>
            </div>

            <div className="bg-primary-500 rounded-md p-2 text-white ">
                <input type="text" className="outline-none bg-transparent" placeholder="Escreva aqui o que esta procur..." />
            </div>
            <div className="text-white flex gap-3">
                <p>preco</p>
                <p>marca</p>
                <p></p>
            </div>

        </header >
    )
}