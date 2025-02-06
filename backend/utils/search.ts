import { ProductType, VariantType } from "../types/types";

export default function search(products: ProductType[], query: string) {
  const searched = products.map((product) => {
    product.variants = deepSearch(product.variants, query);
    return product;
  });
  return searched;
}

const deepSearch = (variants: VariantType[], query: string) => {
  const updatedVariants = variants.map((variant) => {
    if (variant.flavor.includes(query)) variant.isSelected = true;
    if (Array.isArray(variant.sizeDetails)) {
      variant.sizeDetails.map((details) => {
        if (details.size.includes(query)) details.isSelected = true;

        return details;
      })
    };
    return variant;
  });
  return updatedVariants;
};
