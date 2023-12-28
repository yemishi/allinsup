import { SliderProps, Slide, Slider } from '../../../components'
import { parseAlt, productDetails, urlReplace } from '../../../utils'
import { ProductType } from '../../../types'
import { useGlobalState } from '../../../App'
import { Link } from 'react-router-dom'

export default function ProductSliderGrid({ children }: { children: ProductType[] }) {
    const { addProduct, cart } = useGlobalState()
    const parseLocalCurrency = (e: (number)) => e.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    const settings: SliderProps = {
        spaceBetween: 20,
        freeMode: true,
        slidesPerView: "auto",
        grabCursor: true,
        style: {
            background: 'linear-gradient(transparent,#161616)',
            height: "310px",
            cursor: children && children?.length > 2 ? "grab" : "",
            width: '100%',
            bottom: 0,
            zIndex: 10
        }
    }

    return (
        <Slider settings={settings}>

            {children?.map((e) => {
                const sizeIndex = e.variants.map((ele, y) => {
                    const { sizeDetails } = ele;
                    const highlightedIndex = sizeDetails.findIndex((x) => x.sizeHighlight);
                    if (highlightedIndex) return highlightedIndex
                    return
                }).find((highlighted) => highlighted !== null);

                const { _id, category, coverPhoto, flavor, name, price, sizeProduct, stock, updatedName, amount, promotion, } = productDetails(e, cart, e.highlight, sizeIndex)
                const handleStyle = amount && amount >= stock ? "group-hover:bg-[#c18203] bg-[#996600] pointer-events-none" : "bg-secondary hover:bg-secondary-800"

                return <Slide key={`${_id}_${updatedName}`} className='max-w-[200px] group !flex rounded-t-xl text-sm bg-primary-500 font-lato 
                    pb-4 text-white flex-col justify-between'>

                    <div className='bg-white flex items-center justify-center rounded-t-xl p-4'>

                        <Link to={`/${encodeURIComponent(category)}/${urlReplace(`${name}-${flavor}-${sizeProduct}`)}/${_id}`}>
                            <img src={coverPhoto} className='self-center group-hover:scale-110 duration-200 w-[140px] h-[130px] object-contain' alt={parseAlt(coverPhoto)} />
                        </Link>
                    </div>

                    <h3 className='font-bold px-2 truncate-2-lines'>{updatedName}</h3>

                    <div className='flex justify-between text-secondary-200 font-bold px-2'>
                        {promotion && <p>{parseLocalCurrency(promotion)}</p>}
                        <p className={`${promotion ? 'text-white text-xs line-through self-end' : ''} `}>{parseLocalCurrency(price)}</p>
                    </div>
                    <button onClick={() => addProduct(e)}
                        className={`p-2 w-[80%] self-center ${handleStyle}  
                         duration-300 text-xs gap-1 rounded-xl font-sans font-semibold flex justify-center items-center`}>
                        <img src='/cartPlus.svg' className='w-4' />
                        <p>{`${(amount && amount >= stock) ? 'ESGOTADO' : 'ADICIONAR'}`}</p>

                    </button>

                </Slide >
            })}
        </Slider >
    )
}