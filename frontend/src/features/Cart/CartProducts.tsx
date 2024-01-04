import { useGlobalState } from "../../App"
import { parseAlt, urlReplace } from "../../utils"
import { Link } from "react-router-dom"

export default function CartProducts() {
    const { state, dispatch } = useGlobalState()

    const parseLocalCurrency = (e: (number)) => e.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return (
        <div className=" flex flex-col p-3 font-anton ">


            {state.cart.map((product) => {
                const { name, coverPhoto, price, promotion, amount, category, _id, flavor, sizeProduct, updatedName } = product

                return <div key={`${product._id}_${name}_${price}`} className="!flex flex-row gap-3 h-[170px] border-b border-zinc-700 py-6 pb-5 relative" >
                    <Link className="!flex " to={`/${urlReplace(category)}/${urlReplace(`${name}-${flavor}-${sizeProduct}`)}/${_id}`}>
                        <div onClick={() => dispatch({ type: "SET_CART_OPEN", payload: false })} className="w-auto flex bg-white p-2 rounded-md">
                            <img className="object-contain !min-w-[120px] !max-w-[120px] hover:scale-110 duration-300" src={coverPhoto} alt={parseAlt(coverPhoto)} />
                        </div>
                    </Link>
                    <div className="flex flex-col text-sm  w-full">
                        <div className="flex gap-3">
                            <p className="hover:text-secondary-500 duration-300 ">{updatedName}</p>

                            <button onClick={() => dispatch({ type: "REMOVE_PRODUCT", payload: product })} className="cursor-pointer self-start">
                                <svg style={{ strokeWidth: '24px' }} className="stroke-white hover:stroke-secondary-text-secondary-500 duration-300 w-5" viewBox="-23.04 -23.04 302.08 302.08" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"></path> </g></svg>
                            </button>
                        </div>

                        <p>Qtd:{amount}</p>

                        <div className="flex justify-between mt-auto items-end ">
                            <p className="text-secondary-500 font-bold text-lg">{parseLocalCurrency(promotion ? promotion : price)}</p>
                            <span className="flex border-gray-600 p-2 rounded-lg gap-2 border">

                                <button onClick={() => dispatch({ type: "DECREMENT_AMOUNT", payload: { amount: 1, product } })} className="w-5">
                                    <svg className="stroke-white hover:stroke-secondary-text-secondary-500 duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M6 12L18 12" ></path> </g></svg>
                                </button>

                                <input onChange={(event) => dispatch({ type: "UPDATE_PRODUCT_AMOUNT", payload: { amount: parseInt(event.target.value), product } })} min={1} inputMode="decimal" type="number" name="amountItem"
                                    className="bg-transparent w-6 outline-none text-center placeholder:text-white" value={amount} placeholder={String(amount)} />

                                <button onClick={() => dispatch({ type: "INCREMENT_AMOUNT", payload: { amount: 1, product } })} className="w-5">
                                    <svg className="stroke-white fill-white hover:stroke-secondary-text-secondary-500 hover:fill-secondary-text-secondary-500 duration-300" viewBox="-3 0 19 19" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M12.711 9.182a1.03 1.03 0 0 1-1.03 1.03H7.53v4.152a1.03 1.03 0 0 1-2.058 0v-4.152H1.318a1.03 1.03 0 1 1 0-2.059h4.153V4.001a1.03 1.03 0 0 1 2.058 0v4.152h4.153a1.03 1.03 0 0 1 1.029 1.03z"></path></g></svg>
                                </button>
                            </span>
                        </div>

                    </div>

                </div>
            })}

        </div>
    )
}