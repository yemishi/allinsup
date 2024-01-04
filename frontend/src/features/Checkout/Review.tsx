
import { useGlobalState } from "../../App"
import { parseAlt, parseLocalCurrency } from "../../utils"
import { totalPriceSingle } from "../../utils/calcs"
export default function Review() {
    const { state } = useGlobalState()
    return (
        <div>
            <table className="flex items-center justify-center w-full">
                <tbody className="flex flex-col gap-5 bg-primary-550 pt-4 w-full  rounded border-t border-primary-400 ">
                    {state.cart.map((product) => {
                        const { amount, coverPhoto, updatedName, flavor, sizeProduct } = product
                        const totalPrice = totalPriceSingle(product)

                        return <tr key={`${updatedName}_${flavor}_${sizeProduct}`} className="text-gray-200 flex overflow-hidden gap-5 px-2 
                        w-full  border-b pb-2 border-primary-400 ">
                            <td className="flex items-center bg-white p-2 rounded-md  justify-center min-w-[40%] max-w-[40%]">

                                <img className="bg-white h-36 align-middle object-contain" src={coverPhoto} alt={parseAlt(coverPhoto)} />

                            </td>
                            <td className="w-[55%]">
                                <div className="flex flex-col gap-2 font-anton overflow-hidden ">
                                    <p className="font-semibold mr-5">{updatedName}</p>
                                    <p className="font-bold text-secondary-500"> {parseLocalCurrency(totalPrice)}</p>
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