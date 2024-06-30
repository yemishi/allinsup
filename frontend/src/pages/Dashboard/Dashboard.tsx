import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { blinkVariant } from "../../utils/helpers";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import axiosRequest from "../../services/axios.config";
import NotFoundPage from "../NotFoundPage";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: () => axiosRequest.user.info(),
    queryKey: ["user-info", "dashboard"],
  });
  if (isLoading)
    return (
      <div>
        <img className="ml-auto mr-auto" src="/loading.svg" />
      </div>
    );

  if (data?.error || !data?.isAdmin) return <NotFoundPage />;

  const productPath = location.pathname.toLowerCase().includes("/products");
  const orderPath = location.pathname.toLowerCase().includes("/orders");
  const inputClass = `block py-2.5 ps-2 pe-0 w-full text-sm md:text-base text-white bg-transparent border-primary-200 border-b border-gray-300 appearance-none focus:outline-none
  focus:ring-0 focus:border-secondary-600 peer md:text-lg`;

  const labelClass = `absolute text-sm md:text-base text-white text-opacity-50 duration-300 transform -translate-y-7 translate-x-1 scale-75 top-3 pointer-events-none origin-[0] 
  peer-placeholder-shown:start-2 peer-focus:start-0 peer-focus:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
  peer-focus:scale-75 peer-focus:-translate-y-7 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto md:text-lg`;

  return (
    <motion.div
      animate="animate"
      initial="initial"
      exit="exit"
      variants={blinkVariant}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 mt-5"
    >
      <div className="text-gray-400 md:text-lg lg:text-xl px-5 flex gap-2 font-lato ">
        <Link
          to={"products"}
          className={`border-b ${
            productPath
              ? "text-secondary-200 border-secondary-200"
              : "border-gray-400 text-gray-400"
          }`}
        >
          products
        </Link>
        <Link
          className={`border-b ${
            orderPath
              ? "text-secondary-200 border-secondary-200"
              : "border-gray-400 text-gray-400"
          }`}
          to={"orders"}
        >
          orders
        </Link>
      </div>
      {(orderPath || productPath) && (
        <div className="relative w-4/5 self-center mt-5 lg:w-3/6">
          <input
            type="text"
            className={inputClass}
            onChange={(e) =>
              navigate(
                `${productPath ? "products" : "orders"}?q=${e.target.value}`
              )
            }
            placeholder=""
            required
          />
          <label className={labelClass}>Search</label>
        </div>
      )}
      <Outlet />
    </motion.div>
  );
}
