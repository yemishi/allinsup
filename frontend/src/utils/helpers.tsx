import { Variants } from "framer-motion";

import { CartType, ProductType, VariantType, DetailsType } from "../types/response";

const stickyVariant: Variants = {
  sticky: {
    top: 0,
    position: "sticky",
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
  noSticky: {
    top: "-100%",
    position: "sticky",
    transition: { type: "spring", damping: 200, stiffness: 100 },
  },
};
const blinkVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const findInArray = (array: DetailsType[] | VariantType[], index?: number) => {
  if (!Array.isArray(array)) return { value: array };
  if (index && array[index]) return { value: array[index], index };
  else
    return {
      value: array.find((items) => items.isSelected === true) || array[0],
      index: Math.max(
        array.findIndex((items) => items.isSelected === true),
        0
      ),
    };
};

const productDetails = (product: ProductType, cart?: CartType[], variantIndex?: number, sizeIndex?: number) => {
  const { _id, name, variants } = product;

  const {
    value: { flavor, sizeDetails, photos },
    index: variantCurrIndex,
  } = findInArray(variants, variantIndex) as {
    value: VariantType;
    index: number;
  };

  const {
    value: { size, price, stock, promotion },
    index: sizeCurrIndex,
  } = findInArray(sizeDetails, sizeIndex) as {
    value: DetailsType;
    index: number;
  };

  const amount =
    (cart && cart.find((detail) => detail._id === _id && detail.flavor === flavor && detail.size === size)?.amount) ||
    0;
  return {
    coverPhoto: photos[0],
    name: `${name} ${flavor} ${size}`,
    price,
    flavor,
    photos,
    size,
    stock,
    promotion,
    _id,
    amount,
    sizeCurrIndex,
    variantCurrIndex,
    error: false,
  };
};
const cleanClasses = (className = "", fallback = "") => {
  
  const current = className.split(/\s+/);
  const fallbackClasses = fallback.split(/\s+/);

  const getPrefix = (cls: string) => cls.split("-")[0];

  const existingPrefixes = new Set(current.map(getPrefix));

  const filteredFallback = fallbackClasses.filter((cls) => {
    const prefix = getPrefix(cls);
    return !existingPrefixes.has(prefix);
  });

  return [...current, ...filteredFallback].join(" ").trim();
};
const enableScroll = () => (document.body.style.overflow = "");
export { productDetails, blinkVariant, stickyVariant, enableScroll, cleanClasses };
