import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import axiosRequest from "../../services/axios.config";
import { IoMdArrowDropup } from "react-icons/io";
import { parseLocalCurrency, parseToDate } from "../../utils/formatting";
import Track from "../../ui/Track";
import NotFoundPage from "../NotFoundPage";
import { blinkVariant } from "../../utils/helpers";
import { DivList, Image } from "../../ui";

export default function Order() {
  const { orderId: orderIdParam } = useParams();
  const variant = {
    open: { y: 0, opacity: 1, height: "auto" },
    closed: { y: -200, opacity: 0, height: "0px" },
  };
  const [showProducts, setShowProducts] = useState(true);
  const { data, isLoading } = useQuery({
    queryFn: () => axiosRequest.order.single(orderIdParam as string),
    queryKey: [orderIdParam],
  });
  if (isLoading) return <Image src="/loading.svg" className="h-40 w-40 ml-auto mr-auto" />;
  if (!data || data.error) return <NotFoundPage />;

  const {
    products,
    purchaseDate,
    status,
    orderId,
    totalPaid,
    method,
    address: { name, houseNumber, cep },
    receivedDate,
  } = data;
  return (
    <motion.div
      variants={blinkVariant}
      animate="animate"
      initial="initial"
      exit="exit"
      transition={{ duration: 0.2 }}
      className="flex flex-col p-4 text-white gap-7 md:items-center"
    >
      <h1 className="font-anton ml-4 font-semibold text-xl mt-4 font-anton md:text-2xl lg:text-3xl">
        Purchase information
      </h1>
      <div className="w-full max-w-2xl lg:text-lg bg-primary-600 border-y text-gray-200 border-primary-200 ">
        <dl className="flex flex-col gap-3 p-4 ">
          <DivList dt="Purchase date:" dd={parseToDate(purchaseDate)} />
          <DivList dt="Total paid:" dd={parseLocalCurrency(Number(totalPaid))} />
          {receivedDate && <DivList dt="Received at" dd={String(receivedDate)} />}
          <DivList dt="Status" dd={status} />
          <DivList dt="Order id:" dd={orderId} />
          <DivList dt="Payment method" dd={method} />
          <DivList dt="Delivery address" dd={`${cep}-${name}-${houseNumber}`} />
        </dl>
      </div>

      <Track status={status} />

      <div className="flex flex-col gap-2 overflow-hidden self-center">
        <div
          onClick={() => setShowProducts(!showProducts)}
          className="z-20 cursor-pointer font-lato text-lg font-bold p-2 rounded-b-lg
                 bg-primary-600 hover:bg-primary-500 w-full flex duration-200 items-center"
        >
          <h2>Products</h2>
          <IoMdArrowDropup
            className={`w-8 h-8 md:w-10 md:h-10 ml-auto  duration-500 ${
              showProducts ? "rotate-180" : "fill-gray-600 stroke-gray-600 "
            }`}
          />
        </div>

        <motion.div
          transition={{ type: "just" }}
          variants={variant}
          initial={false}
          animate={showProducts ? "open" : "closed"}
          className="flex flex-col gap-4 md:grid md:grid-cols-2"
        >
          {products.map((product, index) => {
            const { coverPhoto, name, price, productId, qtd } = product;

            return (
              <div
                key={`${name}_${productId}_${index}`}
                className="flex gap-7 lg:text-lg md:gap-3 pb-7 md:pb-2 border-b
                         border-primary-200 md:grid md:grid-cols-2 lg:gap-14"
              >
                <Link to={`/product/${productId}`} className="w-2/6 h-28 md:w-auto md:h-36 lg:h-40">
                  <Image
                    src={coverPhoto}
                    className="rounded-lg object-contain p-1 bg-white hover:brightness-110 transition-all"
                  />
                </Link>

                <div className="flex w-3/5 flex-col font-anton md:w-auto">
                  <dl className="flex flex-col gap-2 h-full">
                    <span className="font-semibold text-center text-gray-200 md:text-xl">{name}</span>
                    <span className="mt-auto">
                      <DivList dt="Qtd:" dd={String(qtd)} />
                      <DivList dt="Total:" dd={parseLocalCurrency(Number(price))} />
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
