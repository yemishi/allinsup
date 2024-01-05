
import axios from "axios";
import { CollectionRounded, Products, HighlightProducts } from "../features";
import { Outlet, } from "react-router-dom";


export default function Home() {
  const checkTest = async () => {
    const response = await axios.get("https://allinsupback.onrender.com/test-login")
    console.log(response.data)
  }
  const fetchTest = async () => {
    const response = await axios.get("https://allinsupback.onrender.com/test-makelogin")
    console.log(response.data)
  }
  return (
    <div className="w-full text-white h-full flex flex-col gap-4 overflow-hidden justify-center items-center ">
      <HighlightProducts />
      <CollectionRounded />
      <Products />
        <p onClick={fetchTest}>MakeLogin</p>
      <p onClick={checkTest}>
        check
      </p>
      <div className="bg-primary-550 h-full w-full top-0 z-30  ">
        <Outlet />
      </div>
    </div>
  );
}