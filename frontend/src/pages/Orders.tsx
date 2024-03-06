/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from "react";
import { OrderType } from "../types";
import { axiosRequest } from "../components";
import { blinkVariant, divList } from "../utils";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
import { ErrorPage, Loading } from "../features";
import SimilarProduct from "../features/products/Similar/SimilarProducts";
import { useGlobalState } from "../App";
import { motion } from "framer-motion";

export default function Orders() {
  const tel = localStorage.getItem("tel");
  const { dispatch } = useGlobalState();

  if (!tel) return <ErrorPage msg="É necessario fazer login antes" />;
  
  const {
    data,
    isLoading,
    fetchNextPage,
    error,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["orders"],
    async ({ pageParam }) => {
      const response = await axiosRequest.getOrders(tel as string, pageParam);
      return response.data;
    },
    {
      retry: 2,
      retryDelay: 100,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  if (error) return <ErrorPage msg="Algo deu errado por aqui" />;

  const orders = useMemo(() => {
    if (data) {
      return data.pages.reduce((acc: OrderType[], page: OrderType[]) => {
        return [...acc, ...page];
      });
    }
  }, [data]);

  const errorProps = {
    msg: "É preciso estar logado antes para acessar essa pagina!",
    action: () => dispatch({ type: "SET_USER_OPEN", payload: true }),
    subTitle: "Inicie uma sessão",
  };

  if (isLoading) return <Loading />;

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
        Meus pedidos
      </h1>
      {orders && orders.length > 0 ? (
        <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-6 ">
          {orders.map((order, index) => {
            const { orderId, price, purchaseDate, status } = order;
            return (
              <div
                key={`${order}_${index}`}
                className="p-4 border font-lato text-gray-200 flex w-full rounded bg-primary-550 
                        border-gray-600 lg:text-lg "
              >
                <dl className=" w-full flex flex-col gap-1 md:gap-4">
                  {divList("Encomenda N°:", orderId)}
                  {divList("Data da compra:", purchaseDate)}
                  {divList("Valor:", price)}
                  {divList("Situação:", status)}
                  {divList("Encomenda N°:", orderId)}
                </dl>
                <Link
                  to={`/orderInfo/${orderId}`}
                  className="ml-auto px-2 py-1 border mt-auto border-gray-500 font-serif font-thin rounded-md md:py-2 md:px-4"
                >
                  Detalhes
                </Link>
              </div>
            );
          })}
        </div>
      ) : tel ? (
        <div className="flex flex-col items-center justify-center mt-10 mb-16 ">
          <svg
            viewBox="0 -3 24 24"
            className="w-32 fill-slate-700"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier"></g>
            <g id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M7 0V6C7 6.74338 7.78231 7.2269 8.44721 6.89443L12 5.11803L15.5528 6.89443C16.2177 7.2269 17 6.74338 17 6V0H22C23.1046 0 24 0.89543 24 2V16C24 17.1046 23.1046 18 22 18H2C0.89543 18 0 17.1046 0 16V2C0 0.89543 0.89543 0 2 0H7zM9 0H15V4.38197L12.4472 3.10557C12.1657 2.96481 11.8343 2.96481 11.5528 3.10557L9 4.38197V0z"></path>
            </g>
          </svg>
          <p className="text-gray-600 text-lg text-center">
            Você não possui nenhum pedido ainda.
          </p>
        </div>
      ) : (
        <ErrorPage {...errorProps} />
      )}
      {isFetchingNextPage && (
        <div className="h-full fixed top-0  w-full">
          <Loading />
        </div>
      )}
      {hasNextPage && (
        <button
          className="font-lato border-2 lg:mt-8 lg:font-anton lg:px-12 border-primary-200 bg-primary-600 px-4
             rounded-md text-base font-semibold lg:text-xl py-3  mt-4 hover:bg-primary-500 duration-300"
          onClick={() => fetchNextPage()}
        >
          Ver mais
        </button>
      )}
      <SimilarProduct title="Continue comprando" q="" />
    </motion.div>
  );
}
