
import { useEffect } from "react";
import { useGlobalState } from "../App";
import { CollectionRounded, Products, HighlightProducts } from "../features";
import { Route, Routes, Outlet, Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://100.20.92.101/check-auth")
      console.log(response)
    }
    fetchData()
  }, [])
  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-hidden justify-center items-center ">
      <HighlightProducts />
      <CollectionRounded />
      <Products />
      <div className="bg-primary-550 h-full w-full top-0 z-30  ">
        <Outlet />
      </div>
    </div>
  );
}