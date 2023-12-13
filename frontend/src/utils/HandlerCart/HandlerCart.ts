import { ProductType } from './../../services/axios.config';
import { useGlobalState } from '../../App';
interface CartType {
    mainPhoto: string,
    name: string,
    price: number,
    stockSize: number,
    _id: string

}
export const addProduct = (element: CartType) => {

    const { cart, setCart } = useGlobalState()
    setCart([...cart, element])

}