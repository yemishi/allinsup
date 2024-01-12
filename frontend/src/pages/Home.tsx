
import { CollectionRounded, Products, HighlightProducts } from "../features";
import { motion } from "framer-motion"
import { blinkVariant } from "../utils";
export default function Home() {

  return (
    <motion.div variants={blinkVariant} initial="initial" animate="animate" exit="exit"
      transition={{ duration: 0.2 }}
      className="w-full text-white h-full flex flex-col gap-4 overflow-hidden justify-center items-center ">
      <HighlightProducts />
      <CollectionRounded />
      <Products />
    </motion.div>
  );
}