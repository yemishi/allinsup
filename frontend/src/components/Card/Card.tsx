import { SliderProps, Slide, Slider, ProductType } from '../Components'


interface PropsType {
    settings: SliderProps,
    children: ProductType[]
}
export default function Cart({ children, settings }: PropsType) {

    return (
        <Slider settings={settings} >
            {children?.map((e) => {
                const { title, mainPhoto, desc, price, promotion } = e
                const finalPrice: string = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const newValue: string = promotion?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const formattedTitle = title.replace(/\b\w/g, (match) => match.toUpperCase())

                return <Slide key={title} className='w-[200px] rounded-t-xl text-sm bg-[#282828] font-lato pb-4 text-white flex flex-col justify-between' >
                        
                    <div className='bg-white flex items-center justify-center rounded-t-xl p-4 '>
                        <img src={mainPhoto} className='self-center w-[140px] h-[130px] object-contain' alt={title} />
                    </div>

                    <h3 className='text-white font-bold px-2 test1'>{formattedTitle}</h3>

                    <div className='flex justify-between text-[#fb923c] font-bold px-2'>
                        {promotion && <p>{newValue}</p>}
                        <p className={`${promotion ? 'text-white text-xs line-through self-end' : ''} `}>{finalPrice}</p>
                    </div>

                    <button className=' p-2 w-[80%] self-center bg-[#ff7352] text-xs gap-1 rounded-xl font-sans font-semibold flex justify-center items-center'>
                        <img src='/svgs/cartPlus.svg' className='w-4' />
                        <p>ADICIONAR</p>
                    </button>
                </Slide >
            })}
        </Slider >
    )
}