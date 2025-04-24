import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { OrderType } from "../../types/response";
import useScrollQuery from "../../hooks/useInfiniteQuery";

import ProductsSimilar from "../Product/ProductsSimilar/ProductsSimilar";
import { useCart } from "../../context/Provider";
import { TfiPackage } from "react-icons/tfi";

import { blinkVariant } from "../../utils/helpers";
import { parseLocalCurrency, parseToDate } from "../../utils/formatting";
import { Button } from "../../ui";
import { ErrorWrapper } from "../../components";
import { DivList } from "../../ui";

export default function Orders() {
  const {
    isLoading,
    values: orders,
    isFetchingNextPage,
    hasNextPage,
    ref,
    isError,
    refetch,
  } = useScrollQuery<OrderType>({
    queryKey: ["user-orders"],
    url: "order",
  });
  const { cart, updateCart } = useCart();

  return (
    <motion.div
      animate="animate"
      initial="initial"
      exit="exit"
      variants={blinkVariant}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center p-4 gap-5 w-full "
    >
      <h1 className="text-xl mt-4 self-baseline font-anton font-semibold md:text-2xl lg:text-3xl">My orders</h1>
      <ErrorWrapper error={isError} refetch={refetch}>
        {isLoading ? (
          <img src="/loading.svg" alt="loading" className="h-40 w-40 mt-auto mx-auto" />
        ) : orders.length > 0 ? (
          <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-6 ">
            {orders.map((order, index) => {
              const { _id, purchaseDate, status, totalPaid, receivedDate } = order;
              return (
                <div
                  key={`${order}_${index}`}
                  className="p-4  border font-lato text-gray-200 flex bg-primary-550 hover:bg-primary-500 transition-all
                   border-gray-600 lg:text-lg flex-col gap-4 rounded-xl"
                >
                  <dl className="w-full flex flex-col gap-1 md:gap-4">
                    <DivList dt="Order id:" dd={_id} />
                    <DivList dt="Purchase date" dd={parseToDate(purchaseDate)} />
                    {receivedDate && <DivList dt="Received date" dd={parseToDate(receivedDate)} />}
                    <DivList dt="Value paid" dd={parseLocalCurrency(Number(totalPaid))} />
                    <DivList dt="Status" dd={status} />
                  </dl>
                  <Button className="self-center px-4 py-2 border border-secondary-">
                    <Link to={`/order/${_id}`}>Details</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 mb-16 ">
            <TfiPackage className="w-32 h-32 text-slate-600" />
            <span className="text-gray-600 text-lg text-center">You have zero orders until now.</span>
          </div>
        )}
      </ErrorWrapper>
      <ProductsSimilar title="You may to like" cart={cart} updateCart={updateCart} />

      {!isFetchingNextPage && hasNextPage && <div ref={ref} />}
    </motion.div>
  );
}
