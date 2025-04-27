import { useState } from "react";
import useForm, { FormFields } from "../../../../hooks/useForm";
import { ProductType, VariantType } from "../../../../types/response";
import { Button, Input } from "../../../../ui";
import ProductVariantManager from "./productVariantManager/ProductVariantManager";
import ProductDescManager from "./productDescManager/EditProductDesc";
import { validateVariants, VariantErrors } from "./ValidateVariants";

import { IoCloseSharp } from "react-icons/io5";

interface Props {
  action: (form: ProductType, photosDelete?: string[]) => Promise<void>;
  onClose: () => void;
  product?: ProductType;
  title?: string;
}

export default function ProductForm({ product, action, onClose, title = "Product Manager" }: Props) {
  const [variants, setVariants] = useState<VariantType[] | undefined>(
    product
      ? product.variants
      : [
          {
            flavor: `variant 0`,
            photos: [],
            sizeDetails: [
              {
                price: 22.22,
                size: "20g",
                stock: 10,
              },
            ],
          },
        ]
  );

  const [desc, setDesc] = useState(product?.desc ?? [{ title: "Title 1", text: "Text 1" }]);
  const [picsToDel, setPicsToDel] = useState<string[]>([]);
  const [variantErrors, setVariantErrors] = useState<VariantErrors>();

  const [isLoading, setIsLoading] = useState(false);

  const fields: FormFields = {
    name: { value: product?.name ?? "", min: 1 },
    brand: { value: product?.brand ?? "", min: 1 },
    category: { value: product?.category ?? "", min: 1 },
  };
  const { validateAll, values, fieldsKey, errors, onChange } = useForm<ProductType>(fields);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const variantErrors = validateVariants(variants!);
    setVariantErrors(variantErrors);
    if (!validateAll() || Object.keys(variantErrors).length) return;
    setIsLoading(true);
    if (!variants) return;
    await action({ ...values, variants, desc }, picsToDel);
    setIsLoading(false);
  };
  const handlePicsToDel = (url: string) => {
    const newPic = picsToDel?.includes(url) ? picsToDel.filter((i) => i !== url) : [...(picsToDel || []), url];
    setPicsToDel(newPic);
  };

  return (
    <div
      className="flex flex-col items-center w-screen bg-gradient-to-tl from-primary-500 to-primary overflow-x-hidden  
         h-[100dvh] max-h-[1000px] max-w-3xl md:border md:border-primary-200 md:rounded-xl relative"
    >
      <h2 className="font-montserrat  text-2xl text-secondary-200 font-semibold my-5">{title}</h2>
      <button
        type="button"
        className="absolute right-4 top-4 hover:scale-105 active:scale-95 hover:brightness-110 transition-all"
        onClick={onClose}
      >
        <IoCloseSharp className="h-8 w-8" />
      </button>

      <form onSubmit={handleSubmit} className={"gap-5 md:gap-7 p-8 flex flex-col w-full"}>
        {fieldsKey.map((name, i) => {
          return (
            <Input
              className="self-center text-xl"
              isLoading={isLoading}
              key={`${name}_${i}`}
              label={name}
              value={(values as Record<string, any>)[name]}
              error={errors[name] as string}
              name={name}
              onChange={onChange}
            />
          );
        })}

        <ProductVariantManager
          handlePicsToDel={handlePicsToDel}
          variantErrors={variantErrors}
          variants={variants}
          picsToDel={picsToDel}
          updateVariants={(variants) => setVariants(variants)}
        />

        <ProductDescManager updateDesc={(updated: { text: string; title: string }[]) => setDesc(updated)} desc={desc} />
        <Button type="submit" isLoading={isLoading} className="self-center sticky bottom-5 text-lg">
          Confirm
        </Button>
      </form>
    </div>
  );
}
