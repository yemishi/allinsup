
import { HighlightProducts, } from "../components";
import { Alert } from "../components/Alert"
import { useEffect, useState } from "react";
import { CollectionRounded, Products } from "../features";
import { useBeforeUnload } from "react-router-dom";
export default function Home() {
  const alertProps: object = {
    severity: "info"
  };
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const handlerAlert = { openAlert, setOpenAlert };
  const roundedContent = [

  ]

  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  useBeforeUnload(() => {
    localStorage.setItem('scrollPosition', JSON.stringify({ x: window.scrollX, y: window.scrollY }))
  })
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('scrollPosition', JSON.stringify({ x: window.scrollX, y: window.scrollY }));
  });

  useEffect(() => {
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
   
      const { x, y } = JSON.parse(scrollPosition);
      window.scrollY = y
    }
  }, [])


  return (
    <div  className="w-full h-full flex flex-col gap-4 overflow-hidden justify-center items-center ">
      <HighlightProducts />

      <CollectionRounded />
      <Products />

    </div>
  );
}