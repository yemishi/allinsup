import { UserType } from "../../types/response";
import { DivDraggable } from "../../components";

export default function Address({
  userInfo,
  toggleForm,
}: {
  userInfo: Omit<UserType, "password">;
  toggleForm: () => void;
}) {
  const { address, name } = userInfo;

  return (
    <DivDraggable
      initialDirection="100%"
      exit="-100%"
      removeAnimatePresence
      disableDrag
      className="flex flex-col p-2 gap-4 lg:gap-11 h-full w-full bg-none"
    >
      <h2 className="font-anton text-xl w-max text-gray-200 md:self-center lg:text-2xl">
        Delivery address
      </h2>
      <div className="flex flex-col items-center w-full text-white bg-primary p-6 gap-4 border border-primary-200 ">
        {address ? (
          <div className="flex w-full flex-col gap-6">
            <ul className="font-lato flex flex-col lg:gap-2 lg:text-lg">
              <li>{name}</li>
              <li>
                {address.city}, {address.address} N°
                {address.houseNumber}
              </li>
              <li>
                {address.cep} {address.state}
              </li>
            </ul>
            <button
              onClick={toggleForm}
              className="cursor-pointer border-b leading-4 self-center lg:text-lg text-secondary-200 border-secondary-200 font-lato font-semibold"
            >
              Edit delivery address
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-full items-start rounded-md gap-7 lg:text-lg lg:py-5 lg:gap-10">
            <p className="font-anton text-red-400">
              You must have a delivery address
            </p>
            <button
              onClick={toggleForm}
              className="cursor-pointer underline underline-offset-4 leading-4 self-center font-lato font-semibold "
            >
              Add one
            </button>
          </div>
        )}
      </div>
    </DivDraggable>
  );
}
