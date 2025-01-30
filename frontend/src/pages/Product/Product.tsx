import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axiosRequest from "../../services/axios.config";

import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useCart, useTempOverlay } from "../../context/Provider";

import checkDev from "../../utils/isMobile";
import EditableText from "../../components/ui/EditableText";
import { ReactNode, useState } from "react";
import { CartType } from "../../types/response";
import Checkout from "../../features/Checkout/CheckoutGrid";
import Button from "../../components/ui/Button,";
import VariantOptions from "./VariantOptions";

import ProductsSimilar from "./ProductsSimilar";
import ProductImages from "./ProductImages";
import { productDetails } from "../../utils/helpers";
import { parseLocalCurrency } from "../../utils/formatting";
import NotFoundPage from "../NotFoundPage";
import Description from "../../components/Description/Description";

export default function Product() {
  const { _id } = useParams();
  const [count, setCount] = useState(0);
  const [variantIndex, setVariantIndex] = useState<number>();
  const [sizeIndex, setSizeIndex] = useState<number>();

  const isMobile = checkDev();
  const { cart, updateCart } = useCart();
  const { setChildren, close } = useTempOverlay();

  const { data, isLoading } = useQuery({
    queryFn: () => axiosRequest.product.single(_id as string),
    cacheTime: 3000000,
  });
  if (isLoading)
    return (
      <div className="w-full flex justify-center">
        <img src="/loading.svg" />
      </div>
    );

  if (!data || data?.error) return <NotFoundPage />;

  const {
    amount,
    coverPhoto,
    flavor,
    name,
    photos,
    price,
    promotion,
    size,
    stock,
    variantCurrIndex,
    sizeCurrIndex,
  } = productDetails(data, cart, variantIndex, sizeIndex);

  const changeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (amount === stock) return;
    if (Number(value) + amount > stock) return setCount(stock);
    if (Number(value) < 0) return setCount(0);
    setCount(Number(value));
  };

  const toCart = () => {
    if (amount) {
      const updated = cart.map((i) => {
        if (i._id === data._id && i.flavor === flavor && i.size === size)
          i.amount = count;
        return i;
      });
      return updateCart(updated), setCount(0);
    }
    const updated: CartType[] = [
      ...cart,
      {
        _id: data._id,
        amount: count,
        coverPhoto,
        flavor,
        name,
        price,
        size,
        stock,
        promotion,
      },
    ];
    return updateCart(updated), setCount(0);
  };

  const disableIncrement = count + amount + 1 > stock;
  const perGram = () => {
    const grams = size.replace(/\D/g, "");
    const isKg = size.toLowerCase().includes("kg");

    const totalGrams = isKg ? parseInt(grams) * 1000 : parseInt(grams);
    const total = promotion ? promotion / totalGrams : price / parseInt(grams);

    if (Number.isNaN(total)) return null;
    return `(${parseLocalCurrency(total)} / Grams)`;
  };

  const buyNow = () => {
    const Component = () => <Checkout onClose={close} />;
    toCart(), setChildren(<Component />), setCount(0);
  };

  const Title = ({ children }: { children: ReactNode }) => (
    <span className="border-l-4 border-secondary-600 flex items-center justify-between md:py-1 md:border-l-[6px] my-2 ">
      <h2 className="font-lato font-semibold text-lg ml-1 md:text-xl first-letter:uppercase">
        {children}
      </h2>
    </span>
  );

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="md:hidden first-letter:uppercase text-xl font-bold">
        {name}
      </h1>
      <div className="flex flex-col gap-6 pb-6 w-full p-4 bg-primary-500 rounded-md md:flex-row">
        <ProductImages photos={photos} />

        <div className="flex flex-col gap-4 md:gap-6  md:min-w-[38%] lg:w-[35%] md:max-w-[28%]">
          <h1 className="font-lato text-xl text-white font-medium md:text-2xl lg:text-3xl overflow-hidden hidden md:block">
            {name}
          </h1>
          <span className="flex gap-3 items-center md:gap-0">
            <span className="flex flex-col">
              <span className="text-2xl lg:text-3xl font-bold text-secondary-500 font-lato">
                {promotion
                  ? parseLocalCurrency(promotion)
                  : parseLocalCurrency(price)}
              </span>
              <span className="font-lato text-opacity-70 text-sm lg:text-lg text-white md:mt-1">
                {perGram()}
              </span>
            </span>

            <div className="flex ml-3 mt-auto gap-4 md:mt-0 md:flex-col md:gap-2">
              {promotion && (
                <p className="font-anton line-through font-semibold mt-auto">
                  {parseLocalCurrency(price)}
                </p>
              )}
              {promotion && (
                <p className="bg-secondary-200 text-black font-semibold font-anton text-xs p-2 rounded-md mb-5 md:mb-0 md:text-sm md:p-1">
                  {parseLocalCurrency(promotion)}
                </p>
              )}
            </div>
          </span>

          <div
            className={`flex gap-4 justify-between md:flex-col md:gap-6 ${
              stock === 0 && "grayscale"
            }`}
          >
            {!isMobile && (
              <VariantOptions
                sizeCurrIndex={sizeCurrIndex}
                changeVariant={(index: number) => {
                  setVariantIndex(index), setCount(0);
                }}
                changeSize={(index: number) => {
                  setSizeIndex(index), setCount(0);
                }}
                variants={data.variants}
                variantCurrIndex={variantCurrIndex}
              />
            )}
            <div className="flex md:flex-col gap-5 md:grid md:grid-cols-2 w-full">
              <div className="grid grid-cols-3 gap-4 border border-opacity-40 w-[40%] border-white px-4 py-2 justify-items-center rounded-md md:w-full">
                <button
                  onClick={() => setCount(count - 1)}
                  className={` ${
                    count - 1 < 0 && "pointer-events-none  opacity-40"
                  } p-1`}
                >
                  <FaMinus className="!w-full !h-full " />
                </button>

                <EditableText
                  value={count}
                  placeholder={String(amount)}
                  onChange={changeCount}
                  inputMode="decimal"
                  type="number"
                  name="amount on cart"
                  className={`text-center md:text-lg  ${
                    !count ? "opacity-40" : ""
                  }`}
                  containerClass="h-full w-full flex items-center justify-center"
                />

                <button
                  onClick={() => setCount(count + 1)}
                  className={`${
                    !stock ||
                    (disableIncrement && "pointer-events-none opacity-40")
                  } p-1`}
                >
                  <FaPlus className="!w-full !h-full" />
                </button>
              </div>

              <Button
                disableBounce
                onClick={toCart}
                className={`${
                  !count ? "pointer-events-none opacity-60" : ""
                } bg-secondary-600 w-[55%] rounded flex items-center justify-center gap-1  
                 md:w-full md:rounded-full md:border md:border-white md:p-3 text-sm lg:text-lg font-anton font-semibold`}
              >
                <RiShoppingCartLine className="w-5 h-5" />
                To cart
              </Button>
            </div>
          </div>

          <Button
            onClick={buyNow}
            disableBounce
            className={`bg-sky-500 hover:bg-sky-600 w-full rounded-md ${
              !count ? "pointer-events-none opacity-60" : ""
            } `}
          >
            Buy now
          </Button>
        </div>
      </div>
      {isMobile && (
        <>
          <Title>Product Details</Title>

          <VariantOptions
            sizeCurrIndex={sizeCurrIndex}
            changeVariant={(index: number) => {
              setVariantIndex(index), setCount(0);
            }}
            changeSize={(index: number) => {
              setSizeIndex(index), setCount(0);
            }}
            variants={data.variants}
            variantCurrIndex={variantCurrIndex}
          />
        </>
      )}
      <Title>Product Information</Title>
      <Description desc={data.desc} />
      <ProductsSimilar
        title="You may to like"
        cart={cart}
        updateCart={updateCart}
        brand={data.brand}
      />
    </div>
  );
}
