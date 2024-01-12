
import { useGlobalState } from "../../App"
import { parseAlt, parseLocalCurrency } from "../../utils"
import { totalPriceSingle } from "../../utils/calcs"
export default function Review() {
    const { state } = useGlobalState()
    return (
        <div>
            <table className="flex items-center justify-center w-full">
                <tbody className="flex flex-col gap-5 pt-4 w-full  rounded md:grid md:grid-cols-2 lg:w-[80%]">
                    {state.cart.map((product) => {
                        const { amount, coverPhoto, updatedName, flavor, sizeProduct } = product
                        const totalPrice = totalPriceSingle(product)

                        return <tr key={`${updatedName}_${flavor}_${sizeProduct}`} className="text-gray-200 flex overflow-hidden gap-5 pr-2 
                        w-full border-b border-primary-200 bg-primary-550 border lg:text-lg">
                            <td className="flex items-center bg-white p-2 rounded-md  justify-center min-w-[40%] max-w-[40%]">
                                <img className="bg-white h-36 align-middle object-contain lg:h-44" src={coverPhoto} alt={parseAlt(coverPhoto)} />
                            </td>
                            
                            <td className="w-[55%]">
                                <div className="flex flex-col h-full gap-2 font-anton overflow-hidden py-3 ">
                                    <p className="font-semibold mr-5">{updatedName}</p>
                                    <p className="font-bold text-secondary-500 mt-auto"> {parseLocalCurrency(totalPrice)}</p>
                                    <p className="">Qtd: {amount}</p>
                                </div>
                            </td>
                            { }
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}