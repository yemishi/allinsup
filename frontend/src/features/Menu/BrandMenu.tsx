import { Link } from "react-router-dom"
import { BrandType } from "../../types"

export default function BrandMenu({ handleClose }: { handleClose: () => void }) {
    const brands: BrandType[] = ["growth", "integralmédica", "max titanium", "probiotica", "black skull"]
    return <div className=" pt-3 border-t-2 border-primary-200">
        <strong>
            <h2 className="ml-3 font-anton text-base mb-2">Marcas</h2>
        </strong>

        <ul className="flex flex-col gap-2 font-sans">
            {brands.map((brand, i) => {
                return <Link onClick={handleClose} key={`${brand}_${i}`} to={`/option-menu/${brand}`} className=" pl-4 py-2 hover:bg-primary-400 duration-300">
                    <li className="first-letter:uppercase font-lato">{brand}</li></Link>
            })}
        </ul>
    </div>
}