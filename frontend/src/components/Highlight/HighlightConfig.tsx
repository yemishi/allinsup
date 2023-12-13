import { SliderProps, Slide, Slider } from '..'
import { ProductType } from '../../types'
import { useGlobalState } from '../../App'

interface PropsType {
    settings: SliderProps,
    children: ProductType[]
}
export default function HighlightConfig({ children, settings }: PropsType) {
    const { addProduct, cart } = useGlobalState()
    const parseLocalCurrency = (e: (number)) => e.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return (
        <Slider settings={settings}>
            {children?.map((e) => {

                const { name, mainPhoto, variants, _id, highlight = 0 } = e
                const { flavor, sizeDetails } = variants[0]
                const size = sizeDetails.find((detail) => detail.sizeHighlight)

                if (!size) return;
                const { sizeProduct, price, stock, promotion } = size
                e.updatedName = `${name} ${flavor} ${sizeProduct}`;

                const handlerStock = () => {
                    const findProduct = cart.find((detail) => detail._id === _id && detail.flavor === flavor && detail.sizeProduct === sizeProduct)
                    if (!findProduct) return false
                    if (findProduct?.amount >= stock) return true
                    else false
                }

                const formattedName = name.replace(/\b\w/g, (match) => match.toUpperCase())

                return <Slide key={name} className='w-[200px] group rounded-t-xl text-sm bg-[#282828] font-lato pb-4 text-white flex flex-col justify-between' >

                    <div className='bg-white flex items-center justify-center rounded-t-xl p-4'>
                        <img src={mainPhoto} className='self-center group-hover:scale-110 duration-200 w-[140px] h-[130px] object-contain' alt={name} />
                    </div>

                    <h3 className='font-bold px-2 truncate-2-lines'>{e.updatedName}</h3>

                    <div className='flex justify-between text-[#fb923c] font-bold px-2'>
                        {promotion && <p>{parseLocalCurrency(promotion)}</p>}
                        <p className={`${promotion ? 'text-white text-xs line-through self-end' : ''} `}>{parseLocalCurrency(price)}</p>
                    </div>
                    <button onClick={() => addProduct(e)}
                        className={`p-2 w-[80%] self-center ${handlerStock() ? "group-hover:bg-[#c18203] bg-[#996600] pointer-events-none" : "bg-primary group-hover:bg-purple-700 "}
                         duration-300 text-xs gap-1 rounded-xl font-sans font-semibold flex justify-center items-center`}>
                        <img src='/svgs/cartPlus.svg' className='w-4' />
                        <p>{`${handlerStock() ? 'ESGOTADO' : 'ADICIONAR'}`}</p>

                    </button>
                </Slide >
            })}
        </Slider >
    )
}