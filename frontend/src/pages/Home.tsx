import Carousel from "../components/Carousel"

import { Alert } from "../components/Alert"
import { useState } from "react";
import CollectionRounded from "../components/RoundedMenu/CollectionRounded";


export default function Home() {
  const alertProps: object = {
    severity: "info"
  };
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const handlerAlert = { openAlert, setOpenAlert };
  const roundedContent = [

  ]
  return (
    <div className="gap-6 flex flex-col ">
      <Carousel />
 
      <CollectionRounded />
    </div>
  );
}