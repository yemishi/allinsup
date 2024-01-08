
import { CollectionRounded, Products, HighlightProducts } from "../features";

export default function Home() {

  return (
    <div className="w-full text-white h-full flex flex-col gap-4 overflow-hidden justify-center items-center ">
      <HighlightProducts />
      <CollectionRounded />
      <Products />
    </div>
  );
}