import { ProductType } from "../../types"
import { Link } from "react-router-dom"
import { useGlobalState } from "../../App"
import { AnimatePresence } from 'framer-motion'
import { parseLocalCurrency, urlReplace, productDetails, parseAlt } from "../../utils"
interface PropsType {
    products: ProductType[]
}
export default function ProductGrid({ products }: PropsType) {
    const { dispatch, state } = useGlobalState()
    return <div className="w-full h-full !flex flex-wrap justify-center px-1 gap-4 py-3 font-lato text-sm md:text-base">

        {products && products.map((product) => {

            const { _id, coverPhoto, category, price, stock, promotion, updatedName, amount, flavor, sizeProduct, name } = productDetails(product, state.cart)

            const soldOff = (amount && amount >= stock) || !stock

            return <div key={`/${category}${_id}_${product.name}`} className="!flex hover:shadow-lightOn duration-300  flex-col
            flex-1 min-w-[165px] max-w-[250px] md:min-w-[185px] text-white bg-primary-500 p-1 md:p-2 gap-2 pb-2 md:pb-3 md:gap-4 rounded-lg">

                <div className="flex flex-col gap-2 h-full pb-1" >

                    <Link to={`/${encodeURIComponent(category)}/${urlReplace(`${name}-${flavor}-${sizeProduct}`)}/${_id}`}
                        className="bg-white p-4 cursor-pointer rounded-md ">
                        <img className="w-full h-44 object-contain hover:scale-105 duration-300" src={coverPhoto} alt={parseAlt(coverPhoto)} />
                    </Link>

                    <p className="truncate-2-lines">{updatedName}</p>

                    <div className="flex justify-between items-center mt-auto">

                        <div className="flex flex-row gap-2 relative">
                            {promotion && <p className="font-bold text-secondary-500 duration-300 hover:text-secondary-700">{parseLocalCurrency(promotion)}</p>}
                            <p className={`${promotion ? "text-[10px] md:text-xs text-gray-300  absolute right-0 -bottom-4 line-through " : "hover:text-secondary-700 text-secondary-500"} 
                            font-bold duration-300 `}>{parseLocalCurrency(price)}</p>
                        </div>

                        <button onClick={(e) => { e.preventDefault(), dispatch({ type: "ADD_PRODUCT", payload: product }) }} className={`border py-1 duration-300 px-3 
                        rounded-lg relative ${!amount && !soldOff ? 'border-white ' : "border-secondary-500 "}
                         ${soldOff ? "pointer-events-none grayscale" : "cursor-pointer"} group `}>

                            <svg style={{ strokeWidth: 1.4 }} className={`w-5 md:w-6 ${!amount && !soldOff ? "stroke-white" : 'stroke-secondary-500 '} group-hover:scale-110 duration-300`}
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >

                                <g id="SVGRepo_bgCarrier" />

                                <g id="SVGRepo_tracerCarrier" />

                                <g id="SVGRepo_iconCarrier"> <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" />
                                    <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" /> <path d="M13 13V11M13 11V9M13 11H15M13 11H11" />
                                    <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7" /> </g>
                            </svg>

                            {amount && <span className="bg-secondary-600 w-5 h-5 md:w-6 md:h-6 absolute duration-300 -top-1 -right-1 md:-top-2 rounded-full flex justify-center items-center">
                                <AnimatePresence mode="wait">
                                    <p key={amount} className={`text-xs md:text-sm after:content-["+1"] font-bold after:ml-0.5 pong absolute after:text-green-300 after:font-bold after:absolute  
                                    after:-top-1 after:left-0 after:h-7 `}>{amount}</p>
                                </AnimatePresence>
                            </span>}

                        </button>
                    </div>
                </div>
            </div >
        })}



    </div >
}