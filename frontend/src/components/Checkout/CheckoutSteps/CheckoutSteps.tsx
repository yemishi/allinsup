interface PropsType {
  step: number;
  stepLength: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function CheckoutSteps({ setStep, step, stepLength }: PropsType) {
  return (
    <ul
      className="flex relative text-gray-300 justify-between w-4/5 self-center after:absolute after:border-b after:border-dashed  
        after:top-2/4 after:translate-y-2/4 after:border-white after:w-full my-3"
    >
      {Array.from({ length: stepLength }).map((_, index) => {
        const isActivated = index <= Math.round(step);
        const previous = () => {
          if (isActivated) setStep(index + 1);
        };
        return (
          <li
            onClick={previous}
            className={`${
              isActivated
                ? "text-secondary-500 border-secondary-500 cursor-pointer hover:brightness-150"
                : "pointer-events-none"
            } px-4 bg-primary py-2 flex border-dashed justify-center transition-all items-center border z-10 rounded-full text-lg md:text-xl md:px-6 md:py-4 font-anton`}
            key={index}
          >
            {index + 1}
          </li>
        );
      })}
    </ul>
  );
}
