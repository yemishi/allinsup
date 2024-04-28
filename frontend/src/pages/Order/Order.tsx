import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { Image, axiosRequest } from "../../components";
import { IoMdArrowDropup } from "react-icons/io";
import { DivList } from "../../components/ui/DivList";
import { parseLocalCurrency, parseToDate } from "../../utils/formatting";
import Track from "../../components/ui/Track";
import NotFoundPage from "../NotFoundPage";
import { blinkVariant } from "../../utils/helpers";

export default function Order() {
  const { orderId } = useParams();
  const variant = {
    open: { y: 0, opacity: 1, height: "auto" },
    closed: { y: "-100%", opacity: 0, height: "1px" },
  };
  const [allowProduct, setAllowProduct] = useState(false);
  const { data, isLoading } = useQuery({
    queryFn: () => axiosRequest.order.single(orderId as string),
    queryKey: [orderId],
  });
  if (isLoading) return <div>loading...</div>;
  if (!data || data.error) return <NotFoundPage />;

  const { products, purchaseDate, status, _id, totalPaid, method } = data;

  return (
    <motion.div
      variants={blinkVariant}
      animate="animate"
      initial="initial"
      exit="exit"
      transition={{ duration: 0.2 }}
      className="flex flex-col p-4 text-white gap-7 md:items-center"
    >
      <h1 className="font-anton text-xl lg:text-2xl ml-4  font-semibold ">
        Purchase information
      </h1>
      <div className="w-full max-w-2xl lg:text-lg bg-primary-600 border-y text-gray-200 border-primary-200 ">
        <dl className="flex flex-col gap-3 p-4 ">
          <DivList dt="Purchase date:" dd={parseToDate(purchaseDate)} />
          <DivList
            dt="Total paid:"
            dd={parseLocalCurrency(Number(totalPaid))}
          />
          <DivList dt="Status" dd={status} />
          <DivList dt="Order id:" dd={_id} />
          <DivList dt="Payment method" dd={method} />
        </dl>
      </div>

      <Track status={status} />

      <div className="flex flex-col gap-2 overflow-hidden self-center">
        <div
          onClick={() => setAllowProduct(!allowProduct)}
          className="z-20 cursor-pointer font-lato text-lg font-bold p-2 rounded-b-lg
                 bg-primary-600 hover:bg-primary-500 w-full flex duration-200 items-center"
        >
          <h2>Products</h2>
          <IoMdArrowDropup
            className={`w-8 h-8 md:w-10 md:h-10 ml-auto  duration-500 ${
              allowProduct ? "rotate-180" : "fill-gray-600 stroke-gray-600 "
            }`}
          />
        </div>

        <motion.div
          transition={{ type: "just" }}
          variants={variant}
          initial="closed"
          animate={allowProduct ? "open" : "closed"}
          className="flex flex-col gap-4 md:grid md:grid-cols-2"
        >
          {products.map((product, index) => {
            const { coverPhoto, name, price, productId, qtd, _id } = product;

            return (
              <div
                key={`${name}_${productId}_${index}`}
                className="flex gap-7 lg:text-lg md:gap-3 pb-7 md:pb-2 border-b
                         border-primary-200 md:grid md:grid-cols-2 lg:gap-14"
              >
                <Link
                  to={`/product/${_id}`}
                  className="w-2/6 h-28 md:w-auto md:h-36 lg:h-40"
                >
                  <Image
                    src={coverPhoto}
                    className="rounded-lg duration-300 object-contain p-1 bg-white"
                  />
                </Link>

                <div className="flex w-3/5 flex-col font-anton md:w-auto">
                  <dl className="flex flex-col gap-2  h-full ">
                    <span className="font-semibold text-center text-gray-200 md:text-xl">
                      {name}
                    </span>
                    <span className="mt-auto">
                      <DivList dt="Qtd:" dd={String(qtd)} />
                      <DivList
                        dt="Total:"
                        dd={parseLocalCurrency(Number(price))}
                      />
                    </span>
                  </dl>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
