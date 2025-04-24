import { Link } from "react-router-dom";
import Slider, { Slide } from "./Slider";

import { CartType, ProductType } from "../../types/response";
import { parseLocalCurrency } from "../../utils/formatting";
import { productDetails } from "../../utils/helpers";
import { FaCartPlus } from "react-icons/fa";
import { SliderProps } from "..";
import { Image } from "../../ui";

export default function ProductSlider({
  children,
  highlight,
  cart,
  updateCart,
}: {
  children: ProductType[];
  highlight?: boolean;
  cart: CartType[];
  updateCart: (updated: CartType[]) => void;
}) {
  const minTablet = window.matchMedia("(min-width:768px)").matches;
  const settings: SliderProps = {
    spaceBetween: 20,
    freeMode: true,
    slidesPerView: 2,
    navigation: minTablet,

    style: {
      background: "linear-gradient(transparent,#161616)",
      width: "100%",
      bottom: 0,
      zIndex: 10,
    },

    breakpoints: {
      460: {
        slidesPerView: 2.2,
      },
      550: {
        slidesPerView: 2.5,
      },
      650: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3.3,
      },
      1024: {
        slidesPerView: 3.6,
      },
      1200: {
        slidesPerView: 4.7,
      },
    },
  };
  const addToCart = (product: CartType) => {
    const updated = [...cart, { ...product, amount: 1 }];
    updateCart(updated);
  };

  return (
    <Slider settings={settings}>
      {children?.map((product, index) => {
        const { _id } = product;
        const variantIndex = highlight
          ? product.variants.findIndex((v) =>
              v.sizeDetails.some((s) => s.isHighlight)
            )
          : undefined;
        const sizeIndex = highlight
          ? product.variants[variantIndex as number].sizeDetails.findIndex(
              (s) => s.isHighlight
            )
          : undefined;

        const details = productDetails(product, cart, variantIndex, sizeIndex);
        const { amount, coverPhoto, name, price, promotion, stock } = details;
        const soldOff = stock && amount + 1 > stock;

        const buttonClass = amount
          ? "bg-secondary-200 pointer-events-auto"
          : soldOff
          ? "bg-[#996600] pointer-events-none"
          : "bg-secondary group-hover:bg-secondary-700 hover:bg-secondary-800";

        return (
          <Slide
            key={`${_id}_${name}_${index}`}
            className="group border  border-primary-200 !flex rounded-xl text-sm bg-primary-500 font-lato 
                    pb-4 min-h-[310px] md:min-h-[370px] lg:min-h-[400px] text-white flex-col justify-between md:text-base lg:text-lg"
          >
            <Link
              className="bg-white flex items-center justify-center rounded-t-xl p-4"
              to={`/product/${_id}`}
            >
              <Image
                src={coverPhoto}
                className="group-hover:scale-110 duration-200 w-full h-[140px] md:h-[170px] lg:h-[180px] object-contain"
              />
            </Link>
            <span className="font-bold px-2 truncate-2-lines">{name}</span>

            <div className="flex justify-between text-secondary-200 font-bold px-2">
              {promotion && <p>{parseLocalCurrency(promotion)}</p>}
              <p
              onClick={()=>console.log(price)}
                className={`${
                  promotion
                    ? "text-white text-xs line-through self-end lg:text-base"
                    : ""
                } `}
              >
                {parseLocalCurrency(Number(price))}
              </p>
            </div>
            <button
              onClick={() => addToCart({ ...details, _id })}
              className={`p-2 w-[80%] self-center ${buttonClass} duration-300 text-xs  gap-1 rounded-xl font-sans 
                        font-semibold flex justify-center items-center md:text-sm lg:text-base lg:rounded-lg lg:w-[75%] lg:gap-3`}
            >
              <FaCartPlus className="w-4 h-4 lg:w-6 lg:h-6" />

              <span>{`${
                amount ? "Already in cart" : soldOff ? "Sold off" : "Add"
              }`}</span>
            </button>
          </Slide>
        );
      })}
    </Slider>
  );
}
