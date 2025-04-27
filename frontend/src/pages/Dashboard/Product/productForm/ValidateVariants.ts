import { VariantType } from "../../../../types/response";


export type VariantErrors = Record<
  number,
  {
    flavor?: string | null;
    sizeDetailErrors?: Record<
      number,
      {
        size?: string | null;
        price?: string | null;
        stock?: string | null;
      }
    >;
  }
>;

export function validateVariants(variants: VariantType[]): VariantErrors {
  const errors: VariantErrors = {};

  variants.forEach((variant, variantIndex) => {
    const variantError: VariantErrors[number] = {};

    if (!variant.flavor || variant.flavor.trim() === "") {
      variantError.flavor = "Flavor is required.";
    }

    const sizeDetailErrors: VariantErrors[number]["sizeDetailErrors"] = {};

    variant.sizeDetails.forEach((detail, detailIndex) => {
      const detailError: {
        size?: string | null;
        price?: string | null;
        stock?: string | null;
      } = {};

      if (!detail.size || detail.size.trim() === "") {
        detailError.size = "Size is required.";
      }

      if (detail.price == null || isNaN(detail.price)) {
        detailError.price = "Valid price is required.";
      }

      if (detail.stock == null || isNaN(detail.stock)) {
        detailError.stock = "Valid stock is required.";
      }

      if (Object.keys(detailError).length > 0) {
        sizeDetailErrors[detailIndex] = detailError;
      }
    });

    if (Object.keys(sizeDetailErrors).length > 0) {
      variantError.sizeDetailErrors = sizeDetailErrors;
    }

    if (Object.keys(variantError).length > 0) {
      errors[variantIndex] = variantError;
    }
  });

  return errors;
}
