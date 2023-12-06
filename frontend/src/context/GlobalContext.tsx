import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

interface Product {
    _id: string,
    name: string,
    desc: string,
    photos: string[],
    category: string,
    amount: number,
    options: object[]
}
interface Categories {
    whey: Product[],
    creatine: Product[],
    preWorkout: Product[],
    combo: Product[],

}
type GlobalState = {
    categories: Categories | {}
}

const fetchData = async (): Promise<Categories> => {
    try {
        const wheyResponse = await axios.get<Product[]>(`${import.meta.env.VITE_API_URL}/products/?category=whey`)
        const creatineResponse = await axios.get<Product[]>(`${import.meta.env.VITE_API_URL}/products/?category=creatine`)
        const preWorkoutResponse = await axios.get<Product[]>(`${import.meta.env.VITE_API_URL}/products/?category=pre-workout`)
        const comboResponse = await axios.get<Product[]>(`${import.meta.env.VITE_API_URL}/products/?category=combo`)
        const categories: Categories = { whey: wheyResponse.data, creatine: creatineResponse.data, preWorkout: preWorkoutResponse.data, combo: comboResponse.data, }

        return categories
    } catch (error) {
        console.log(error)
        throw new Error('Erro ao buscar os dados dos produtos')
    }
}
export const GlobalContext = createContext<GlobalState>({ categories: {} })


export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Categories | {}>({})
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetchData()
                setCategories(data)
            } catch (error) {
                console.log(error)
                throw new Error("Error ao buscar os dados do produto");

            }
        }
        fetchCategories()
    }, [])

    return <GlobalContext.Provider value={{ categories }}> {children}</GlobalContext.Provider >
}