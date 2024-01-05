
import { CollectionRounded, Products, HighlightProducts } from "../features";
import { Link, Outlet, } from "react-router-dom";

export default function Home() {

  return (
    <div className="w-full text-white h-full flex flex-col gap-4 overflow-hidden justify-center items-center ">
      <HighlightProducts />
      <CollectionRounded />
      <Products />
      <Link to={"/dashboard-admin"}>DashBoard</Link>
      <div className="bg-primary-550 h-full w-full top-0 z-30  ">
        <Outlet />
      </div>
    </div>
  );
}