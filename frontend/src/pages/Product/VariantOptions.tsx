import { Slide, Slider, SliderProps } from "../../components";
import { VariantType } from "../../types/response";
import checkDev from "../../utils/isMobile";

interface PropsType {
  variants: VariantType[];
  changeVariant: (index: number) => void;
  changeSize: (index: number) => void;
  variantCurrIndex: number;
  sizeCurrIndex: number;
}

export default function VariantOptions({
  changeSize,
  changeVariant,
  variants,
  sizeCurrIndex,
  variantCurrIndex,
}: PropsType) {
  const isMobile = checkDev();

  const settingsOptions: SliderProps = {
    spaceBetween: 20,
    slidesPerView: "auto",
    allowTouchMove: isMobile,

    style: {
      width: "100%",
    },
  };

  return (
    <div className="flex gap-3 flex-col border-b border-opacity-30 md:border-none border-white bg-primary-500 px-4 md:px-0 py-2 rounded-lg md:rounded-none">
      <span className="gap-1 flex font-lato">
        <p className="font-thin lg:text-xl lg:font-semibold">Chosen Flavor</p>
      </span>

      <span className="lg:hidden text-secondary-200">
        {variants[variantCurrIndex].flavor}
      </span>

      <Slider settings={settingsOptions}>
        {variants.map((e, i) => {
          return (
            <Slide
              key={`${e}-${i}`}
              className="!w-auto flex-wrap hidden lg:flex gap-4"
            >
              <div
                onClick={() =>
                  i === variantCurrIndex ? null : changeVariant(i)
                }
                className={` ${
                  i === variantCurrIndex
                    ? "border-secondary-200"
                    : "opacity-50 border-white"
                }  !w-auto border-2 cursor-pointer text-sm md:text-base font-semibold p-2 rounded-lg font-lato`}
              >
                <p>{e.flavor}</p>
              </div>
            </Slide>
          );
        })}
      </Slider>

      <span className="h-[1px] w-full bg-white bg-opacity-50 self-center my-2" />

      <span className="gap-1 flex font-lato">
        <p className="font-thin lg:text-xl lg:font-semibold">Chosen Flavor</p>
      </span>
      <span className="lg:hidden text-secondary-200">
        {variants[variantCurrIndex].sizeDetails[sizeCurrIndex].size}
      </span>

      <Slider settings={settingsOptions}>
        {variants[variantCurrIndex].sizeDetails.map((e, i) => {
          return (
            <Slide
              key={`${e}-${i}`}
              className="!w-auto flex-wrap hidden lg:flex gap-4"
            >
              <div
                onClick={() => (i === sizeCurrIndex ? null : changeSize(i))}
                className={` ${
                  i === sizeCurrIndex
                    ? "border-secondary-200"
                    : "opacity-50 border-white"
                }  !w-auto border-2 cursor-pointer text-sm md:text-base font-semibold p-2 rounded-lg font-lato `}
              >
                <p>{e.size}</p>
              </div>
            </Slide>
          );
        })}
      </Slider>
      <span className="h-[1px] w-full bg-white bg-opacity-50 self-center my-2" />
    </div>
  );
}
