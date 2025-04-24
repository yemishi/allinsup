import { UserType } from "../../../types/response";
import { MotionDiv } from "../../../ui";

export default function UserAddress({
  userInfo,
  toggleForm,
}: {
  userInfo: Omit<UserType, "password">;
  toggleForm: () => void;
}) {
  const { address, name } = userInfo;

  return (
    <MotionDiv className="flex flex-col p-2 gap-4 lg:gap-11 bg-none">
      <div
        className="flex flex-col items-center w-full mt-20 bg-gradient-to-br from-primary to-primary-550 p-6 gap-4 border rounded-lg
       border-primary-200 "
      >
        {address ? (
          <div className="flex w-full flex-col gap-7 lg:text-lg lg:py-5 lg:gap-10">
            <ul className="font-lato flex flex-col lg:gap-2 lg:text-lg">
              <li>{name}</li>
              <li>
                {address.city}, {address.address} N°
                {address.houseNumber}
              </li>
              <li>
                {address.cep} {address.state}
              </li>

              {address.complement && <li>{address.complement}</li>}
            </ul>
            <button
              onClick={toggleForm}
              className="cursor-pointer text-secondary-300 hover:brightness-110 underline underline-offset-4 leading-4 self-center font-lato font-semibold
               transition-all"
            >
              Edit delivery address
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-start rounded-md gap-7 lg:text-lg lg:py-5 lg:gap-10">
            <p className="font-anton text-red-400">You must have a delivery address</p>
            <button
              onClick={toggleForm}
              className="cursor-pointer text-secondary-300 hover:brightness-110 underline underline-offset-4 leading-4 self-center font-lato font-semibold
               transition-all"
            >
              Add address
            </button>
          </div>
        )}
      </div>
    </MotionDiv>
  );
}
