import { MotionDiv } from "../../../ui";

interface PropsType {
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
}

export default function MethodPicker({ method, setMethod }: PropsType) {
  const methods = ["PayPal", "Card", "Cash on Delivery"];
  return (
    <MotionDiv className="flex flex-col gap-3 md:w-3/6 md:gap-4 p-2 mt-10">
      {methods.map((item, index) => {
        const isActivated = item === method;
        return (
          <div
            key={`${item}_${index}`}
            onClick={() => setMethod(item)}
            className={`flex font-lato rounded-lg cursor-pointer  
                    font-medium gap-3 p-4 items-center border bg-primary transition-all w-full ${
                      isActivated ? "border-secondary-300" : "border-opacity-30 border-white"
                    }`}
          >
            <span
              className={`p-4 md:p-5 rounded-full border-2 duration-200 border-primary-400 
                      ${isActivated ? "bg-secondary-500" : ""}`}
            />
            <p className="font-anton md:text-lg">{item}</p>

            <span className="ml-auto">
              <div className="w-8 h-8 md:w-11 md:h-11"></div>
            </span>
          </div>
        );
      })}
    </MotionDiv>
  );
}
