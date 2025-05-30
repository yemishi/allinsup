import { ReactNode, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useScrollQuery from "../../../hooks/useInfiniteQuery";
import { OrderType } from "../../../types/response";

import EditOrder from "./EditOrder";

import { parseLocalCurrency } from "../../../utils/formatting";

import Modal from "../../../components/Modal/Modal";
import { DivList, Image, Button } from "../../../ui";

export default function OrdersDashboard() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") as string;
  const [isModal, setIsModal] = useState<ReactNode | false>(false);

  const {
    isLoading,
    values: orders,
    hasNextPage,
    ref,
    isFetchingNextPage,
    refetch,
  } = useScrollQuery<OrderType>({
    queryKey: ["orders-panel", query],
    url: `order/admin?query=${query || ""}`,
  });

  if (isLoading) return <img src="/loading.svg" className="self-center" alt="loading icon" />;
  const edit = (order: OrderType) => {
    setIsModal(<EditOrder onSuccess={refetch} onClose={() => setIsModal(false)} order={order} />);
  };

  return (
    <div className="flex flex-col items-center text-gray-200 p-4 gap-4 md:gap-7 lg:gap-10 w-full">
      {orders.map((order, i) => {
        const { products, address: userAddress, status, purchaseDate, receivedDate, user, totalPaid, orderId } = order;
        const { cep, city, state, complement, houseNumber, name } = userAddress;
        const date = new Date(purchaseDate);
        const receive = receivedDate && new Date(receivedDate);
        const purchaseFormatted = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
        const receivedFormatted = receive && `${receive.getMonth()}/${receive.getDay()}/${receive.getFullYear()}`;

        return (
          <div
            className="w-full flex items-center lg:text-lg md:grid md:grid-cols-2 gap-5 bg-primary-600 border border-primary-200 flex-col p-3 rounded-md "
            key={`${order._id}_${user.userId}_${orderId}_${i}`}
          >
            {isModal && (
              <Modal className="mx-auto my-auto" onClose={() => setIsModal(false)}>
                {isModal}
              </Modal>
            )}
            <div className="flex flex-col w-full gap-2 items-center">
              <h2 className="text-lg lg:text-xl font-montserrat font-semibold py-3 text-sky-300">User information</h2>
              <DivList dt="Order id:" dd={orderId} />
              <DivList dt="User name:" dd={user.name as string} />
              <DivList dt="User email:" dd={user.email as string} />

              <DivList dt="Address:" dd={name} />
              <DivList dt="City:" dd={city} />
              <DivList dt="State:" dd={state} />
              <DivList dt="House number:" dd={String(houseNumber)} />

              {complement && <DivList dt="Complement:" dd={complement} />}
              <DivList dt="Cep:" dd={cep} />

              <h2 className="text-lg font-montserrat font-semibold py-3 text-sky-300">Purchase details</h2>
              <DivList dt="Purchase date:" dd={purchaseFormatted} />
              {receivedFormatted && <DivList dt="Receive date:" dd={receivedFormatted} />}

              <DivList dt="Total paid:" dd={parseLocalCurrency(totalPaid)} />

              <DivList dt="Status:" dd={status} />
            </div>

            <div className="w-full h-full flex flex-col items-center gap-4">
              <h2 className="text-lg lg:text-xl font-montserrat font-semibold py-3 text-sky-300">
                Products information
              </h2>

              <div className="flex flex-col gap-6 w-full md:grid md:grid-cols-2 ">
                {products.map((product, index) => {
                  const { coverPhoto, name, qtd } = product;

                  return (
                    <div
                      key={`${name}_${index}`}
                      className="flex gap-4 w-full justify-between border-b pb-2 border-primary-200 "
                    >
                      <span className="w-36 h-36 lg:w-40 lg:h-40">
                        <Image className="object-contain p-2 bg-white rounded-lg" src={coverPhoto} />
                      </span>
                      <div className="flex flex-col gap-2 flex-1">
                        <p className="font-lato text-base lg:text-lg self-end font-semibold text-secondary-200">
                          {name}
                        </p>
                        <span className="flex self-end mt-auto  gap-2">
                          <p className="font-thin">Amount:</p>
                          <p className="font-bold text-secondary-500">{qtd}</p>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Button
              onClick={() => edit(order)}
              className="p-2 px-10 bg-gray-200 text-black font-semibold font-lato mt-2 md:mt-10 col-span-2 mx-auto"
            >
              Edit
            </Button>
          </div>
        );
      })}

      {!isFetchingNextPage && hasNextPage && <div ref={ref} />}
    </div>
  );
}
