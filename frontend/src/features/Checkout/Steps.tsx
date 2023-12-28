import { useLocation, Link } from "react-router-dom"

export default function Steps() {
    const steps = ["address", "review", "payment"]
    const location = useLocation()

    return (
        <ul className="flex relative text-gray-300 justify-between w-4/5 self-center py-3 ">
            {steps.map((element, index) => {
                const currentPath = steps.filter((e) => location.pathname.toLocaleLowerCase().includes(e))
                const indexPath = steps.indexOf(currentPath[0])
                const foundActive = index === indexPath || indexPath >= index

                const before = index === 1 || index === 2 ? "before:absolute before:border-b before:left-[14%] before:border-dashed before:-translate-x-[110%] before:top-2/4 before:translate-y-2/4 before:border-white before:w-[205%]" : ""
      
                return <li className={`${foundActive ? "text-secondary-500 border-secondary-500" : ""} px-4 bg-primary py-2 flex border-dashed justify-center 
                ${before} ${index <= indexPath ? "before:border-secondary-500" : ""} items-center border rounded-full relative -translatex text-lg font-anton`} key={index}>
                    {index < indexPath ? (
                        <Link onClick={() => console.log('aaa')} to={`/checkout/${element}`}>{index + 1} </Link>
                    ) : (
                        index + 1
                    )}
                </li>
            })}
        </ul>
    )
}