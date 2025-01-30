import { DivDraggable } from "../../components";

interface PropsType {
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
}

export default function PaymentMethod({ method, setMethod }: PropsType) {
  const methods: ("paypal" | "card" | "cashOnDelivery")[] = ["paypal", "card", "cashOnDelivery"];
  const methodMap = {
    "cashOnDelivery": "Cash on Delivery",
    "card": "Card",
    "paypal": "PayPal",
  }
  return (
    <DivDraggable
      initialDirection="100%"
      exit="-100%"
      removeAnimatePresence
      disableDrag
      className="flex w-full h-full flex-col gap-2 text-gray-200 p-2 self-center"
    >
      <h2 className="font-anton text-xl text-gray-200 md:self-center lg:text-2xl">
        Payment Method
      </h2>
      <div className="flex flex-col gap-3 text-gray-200 p-2 pb-6 pt-4 md:grid md:grid-cols-2">
        {methods.map((item, index) => {
          const isActivated = item === method;
          return (
            <div
              key={`${item}_${index}`}
              onClick={() => setMethod(item)}
              className={`flex font-lato rounded-lg cursor-pointer  
                    font-medium gap-3 p-4 items-center border bg-primary duration-200 w-full ${isActivated
                  ? "border-secondary-300"
                  : "border-opacity-30 border-white"
                }`}
            >
              <span
                className={`p-4 md:p-5 rounded-full border-2 duration-200 border-primary-400 
                      ${isActivated ? "bg-secondary-500" : ""}`}
              />
              <p className="font-anton md:text-lg">{methodMap[item]}</p>

              <span className="ml-auto">
                <div className="w-8 h-8 md:w-11 md:h-11"></div>
              </span>
            </div>
          );
        })}
      </div>
    </DivDraggable>
  );
}
