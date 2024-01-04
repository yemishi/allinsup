import { useLocation, Link } from "react-router-dom"

export default function Steps() {
    const steps = ["address", "review", "payment"]
    const location = useLocation()

    return (
        <ul className="flex relative text-gray-300 justify-between w-4/5 self-center after:absolute after:border-b after:border-dashed  
        after:top-2/4 after:translate-y-2/4 after:border-white after:w-full my-3">
            {steps.map((element, index) => {
                const currentPath = steps.filter((e) => location.pathname.toLocaleLowerCase().includes(e))
                const indexPath = steps.indexOf(currentPath[0])
                const foundActive = index === indexPath || indexPath >= index

                return <li className={`${foundActive ? "text-secondary-500 border-secondary-500" : ""} px-4 bg-primary py-2 flex border-dashed justify-center 
                    items-center border z-10 rounded-full text-lg font-anton`} key={index}>
                    {index < indexPath ? (
                        <Link to={`/checkout/${element}`}>{index + 1} </Link>
                    ) : (
                        index + 1
                    )}
                </li>
            })}
        </ul>
    )
}