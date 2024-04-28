import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blinkVariant } from "../utils/helpers";

export default function NotFoundPage() {
  return (
    <motion.div
      animate="animate"
      exit="exit"
      initial="initial"
      variants={blinkVariant}
      className="h-screen flex items-center text-center w-full bg-primary justify-center text-white absolute self-center z-50"
    >
      <div className="px-5 rounded-lg shadow-md flex flex-col">
        <h1 className="text-3xl font-bold font-lato text-secondary-200 md:text-4xl">
          Lost in the Abyss: 404 Error
        </h1>

        <p className="text-white text-opacity-60 px-6 my-6 max-w-3xl md:text-lg lg:text-xl">
          Oops! Looks like you've stumbled into uncharted territory. Navigate
          back to safety or embark on a new journey from our homepage. Adventure
          awaits!
        </p>
        <Link
          to="/"
          className="bg-white bg-opacity-75 text-black font-anton hover:bg-opacity-50 active:bg-opacity-100 duration-200 font-bold 
          py-3 px-5 md:text-lg rounded self-center mt-4"
        >
          Back to home
        </Link>
      </div>
    </motion.div>
  );
}
