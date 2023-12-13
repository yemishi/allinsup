
import { HighlightProducts, Cart, CollectionRounded } from "../components";
import { Alert } from "../components/Alert"
import { useState } from "react";


export default function Home() {
  const alertProps: object = {
    severity: "info"
  };
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const handlerAlert = { openAlert, setOpenAlert };
  const roundedContent = [

  ]
  return (
    <div className="w-full h-full flex flex-col gap-4 z-0 justify-center items-center ">
      <HighlightProducts />
 
      <CollectionRounded />

    </div>
  );
}