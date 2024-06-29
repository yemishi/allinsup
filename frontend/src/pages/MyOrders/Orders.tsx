/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useScrollQuery from "../../hooks/useInfiniteQuery";
import { DivList } from "../../components/ui/DivList";
import { OrderType } from "../../types/response";

import ProductsSimilar from "../Product/ProductsSimilar";
import { useCart, useTempOverlay } from "../../context/Provider";
import { TfiPackage } from "react-icons/tfi";
import ErrorPage from "../../features/Error/ErrorPage";
import SessionForm from "../../components/form/user/SessionForm";
import { blinkVariant } from "../../utils/helpers";
import { parseLocalCurrency } from "../../utils/formatting";
import { Image } from "../../components";

export default function Orders() {
  const {
    isLoading,
    values: orders,
    isFetchingNextPage,
    hasNextPage,
    ref,
    hasError,
    refetch,
  } = useScrollQuery<OrderType>({
    queryKey: ["user-orders"],
    url: "order",
  });
  const { cart, updateCart } = useCart();
  const { setChildren, close } = useTempOverlay();
  if (isLoading)
    return <Image src="/loading.svg" className="h-40 w-40 ml-auto mr-auto" />;

  const errorProps = {
    msg: "You must be logged first for see your orders",
    action: () =>
      setChildren(<SessionForm onSignInSuccess={refetch} onClose={close} />),
    subTitle: "Sign in",
  };

  return (
    <motion.div
      animate="animate"
      initial="initial"
      exit="exit"
      variants={blinkVariant}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center p-4 text-white gap-5 w-full"
    >
      <h1 className="text-xl mt-4 self-baseline font-anton font-semibold md:text-2xl lg:text-3xl">
        My orders
      </h1>
      {orders && orders.length > 0 ? (
        <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-6 ">
          {orders.map((order, index) => {
            const { _id, purchaseDate, status, totalPaid, receivedDate } =
              order;
            const date = new Date(purchaseDate);
            const receive = receivedDate && new Date(receivedDate);
            const receiveFormatted =
              receive &&
              `${receive.getMonth()}/${receive.getDay()}/${receive.getFullYear()}`;
            const dateFormatted = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
            return (
              <div
                key={`${order}_${index}`}
                className="p-4 border font-lato text-gray-200 flex w-full rounded bg-primary-550 
                        border-gray-600 lg:text-lg flex-col gap-4"
              >
                <dl className="w-full flex flex-col gap-1 md:gap-4">
                  <DivList dt="Order id:" dd={_id} />
                  <DivList dt="Purchase date" dd={dateFormatted} />
                  {receiveFormatted && (
                    <DivList dt="Received date" dd={dateFormatted} />
                  )}
                  <DivList
                    dt="Value paid"
                    dd={parseLocalCurrency(Number(totalPaid))}
                  />
                  <DivList dt="Status" dd={status} />
                </dl>
                <Link
                  to={`/order/${_id}`}
                  className="self-center px-4 py-1 border mt-auto border-gray-500 font-serif font-thin rounded-md md:py-2 md:px-4"
                >
                  Details
                </Link>
              </div>
            );
          })}
        </div>
      ) : !hasError ? (
        <div className="flex flex-col items-center justify-center mt-10 mb-16 ">
          <TfiPackage className="w-32 h-32 text-slate-600 " />

          <span className="text-gray-600 text-lg text-center">
            You have zero orders until now.
          </span>
        </div>
      ) : (
        <ErrorPage {...errorProps} />
      )}
      <ProductsSimilar
        title="You may to like"
        cart={cart}
        updateCart={updateCart}
      />

      {!isFetchingNextPage && hasNextPage && <div ref={ref} />}
    </motion.div>
  );
}
