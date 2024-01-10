
import { CollectionRounded, Products, HighlightProducts } from "../features";
import { motion } from "framer-motion"
export default function Home() {

  return (
    <motion.div className="w-full text-white h-full flex flex-col gap-4 overflow-hidden justify-center items-center ">
      <HighlightProducts />
      <CollectionRounded />
      <Products />
    </motion.div>
  );
}