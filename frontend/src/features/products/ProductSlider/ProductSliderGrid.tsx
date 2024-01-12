import { SliderProps, Slide, Slider } from '../../../components'
import { parseAlt, productDetails, urlReplace } from '../../../utils'
import { ProductType } from '../../../types'
import { useGlobalState } from '../../../App'
import { Link } from 'react-router-dom'

export default function ProductSliderGrid({ children }: { children: ProductType[] }) {
    const { dispatch, state } = useGlobalState()
    const minTablet = window.matchMedia("(min-width:768px)").matches

    const parseLocalCurrency = (e: (number)) => e.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    const settings: SliderProps = {
        spaceBetween: 20,
        freeMode: true,
        slidesPerView: 2,
        navigation: minTablet,

        style: {
            background: 'linear-gradient(transparent,#161616)',
            cursor: children && children?.length > 2 ? "grab" : "",
            width: '100%',
            bottom: 0,
            zIndex: 10,
        },

        breakpoints: {
            460: {
                slidesPerView: 2.2,
            },
            550: {
                slidesPerView: 2.5,
            },
            650: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 3.3,
            },
            1024: {
                allowTouchMove: false,
                slidesPerView: 3.6,
            },
            1200:{
                allowTouchMove: false,
                slidesPerView:4.7
            }
        }
    }
    return (
        <Slider settings={settings} >

            {children?.map((e) => {
                const sizeIndex = e.variants.map((ele) => {
                    const { sizeDetails } = ele;
                    const highlightedIndex = sizeDetails.findIndex((x) => x.sizeHighlight);
                    if (highlightedIndex) return highlightedIndex
                    return
                }).find((highlighted) => highlighted !== null);

                const { _id, category, coverPhoto, flavor, name, price, sizeProduct, stock, updatedName, amount, promotion } = productDetails(e, state.cart, e.highlight, sizeIndex)
                const soldOff = ((amount && amount >= stock) || !stock)
                const handleStyle = soldOff ? "group-hover:bg-[#c18203] bg-[#996600] pointer-events-none" : "bg-secondary hover:bg-secondary-800"

                return <Slide key={`${_id}_${updatedName}`} className='group !flex rounded-xl text-sm bg-primary-500 font-lato 
                    pb-4 min-h-[310px] md:min-h-[370px] lg:min-h-[400px] text-white flex-col justify-between md:text-base lg:text-lg'>

                    <Link className='bg-white flex items-center justify-center rounded-t-xl p-4' to={`/${encodeURIComponent(category)}/${urlReplace(`${name}-${flavor}-${sizeProduct}`)}/${_id}`}>
                        <img src={coverPhoto} className='self-center group-hover:scale-110 duration-200 w-full h-[140px] md:h-[170px] lg:h-[180px] object-contain' alt={parseAlt(coverPhoto)} />
                    </Link>

                    <h3 className='font-bold px-2 truncate-2-lines '>{updatedName}</h3>

                    <div className='flex justify-between text-secondary-200 font-bold px-2'>
                        {promotion && <p>{parseLocalCurrency(promotion)}</p>}
                        <p className={`${promotion ? 'text-white text-xs line-through self-end lg:text-base' : ''} `}>{parseLocalCurrency(price)}</p>
                    </div>
                    <button onClick={() => dispatch({ type: "ADD_PRODUCT", payload: e })}
                        className={`p-2 w-[80%] self-center ${handleStyle} duration-300 text-xs  gap-1 rounded-xl font-sans 
                        font-semibold flex justify-center items-center md:text-sm lg:text-base lg:rounded-lg lg:w-[75%] lg:gap-3`}>

                        <svg style={{ strokeWidth: 1.4 }} className='w-4 stroke-white lg:w-7'
                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >

                            <g id="SVGRepo_bgCarrier" />

                            <g id="SVGRepo_tracerCarrier" />

                            <g id="SVGRepo_iconCarrier"> <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" />
                                <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" /> <path d="M13 13V11M13 11V9M13 11H15M13 11H11" />
                                <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7" /> </g>
                        </svg>

                       
                        <p>{`${soldOff ? 'ESGOTADO' : 'ADICIONAR'}`}</p>

                    </button>

                </Slide >
            })
            }
        </Slider >
    )
}