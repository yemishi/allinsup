import { Link } from "react-router-dom"
export default function CategoryMenu({ handleClose }: { handleClose: () => void }) {
    const categories = ["whey", "creatina", "pre-treino", "hipercalorio"]
    return <div className="pt-3">
        <h2 className="font-anton ml-3 text-base mb-2"><strong>Categoria</strong></h2>
        <ul className="flex flex-col gap-2 font-sans">
            {categories.map((category, i) => {
                return <Link onClick={handleClose} key={`${category}_${i}`} to={`/option-menu/${category}`} className="pl-4 py-2 hover:bg-primary-400 duration-300">
                    <li className="first-letter:uppercase">{category}</li></Link>
            })}
        </ul>
    </div>
}