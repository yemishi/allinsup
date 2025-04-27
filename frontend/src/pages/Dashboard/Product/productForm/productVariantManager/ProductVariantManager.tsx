import { Button, Input } from "../../../../../ui";
import DetailsConfig from "./variantDetailsManager/VariantDetailsManager";
import VariantPicsManager from "./variantPicsManager/VariantPicsManager";
import { VariantType } from "../../../../../types/response";

import { MdCancel } from "react-icons/md";
import { VariantErrors } from "../ValidateVariants";

interface PropsType {
  picsToDel: string[];
  handlePicsToDel: (pic: string) => void;
  updateVariants: (updatedVariants: VariantType[]) => void;
  variantErrors?: VariantErrors;
  variants?: VariantType[];
}

export default function ProductVariantManager({
  variants = [],
  handlePicsToDel,
  picsToDel,
  updateVariants,
  variantErrors,
}: PropsType) {
  const defaultVariant = {
    flavor: `variant ${variants.length + 1}`,
    photos: [],
    sizeDetails: [
      {
        price: 22.22,
        size: "20g",
        stock: 10,
      },
    ],
  };

  const updateName = (value: string, index: number) => {
    const updatedVariants = [...variants];
    updatedVariants[index].flavor = value;
    updateVariants(updatedVariants);
  };

  const remove = (index: number) => {
    const updated = variants.filter((_, vIndex) => vIndex !== index);
    updateVariants(updated);
  };

  return (
    <div className="flex flex-col gap-7 pb-4 mt-4 ">
      {variants?.map((variant, index) => {
        const { flavor, sizeDetails, photos, imageFiles } = variant;

        return (
          <div
            key={`${variant}_${index}`}
            className="space-y-4 p-4 relative bg-primary-550 border border-primary-300 rounded-lg shadow-lg shadow-primary"
          >
            <h3 className="font-montserrat text-xl font-semibold text-secondary-200 mb-7">{`Variant ${index + 1}`}</h3>
            <Input
              label="Flavor"
              name="flavor"
              error={(variantErrors && variantErrors[index] && variantErrors[index].flavor) || ""}
              className="mx-auto w-fit text-lg "
              value={flavor}
              onChange={(e) => updateName(e.target.value, index)}
            />

            {variants.length > 1 && (
              <span onClick={() => remove(index)} className="absolute right-0 top-0 p-2 backdrop rounded-lg">
                <MdCancel
                  className="text-red-400 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  size={28}
                />
              </span>
            )}

            <DetailsConfig
              variantIndex={index}
              details={sizeDetails}
              sizeDetailErrors={variantErrors && variantErrors[index] && variantErrors[index].sizeDetailErrors}
              updateDetails={(details) => {
                const updated = [...variants];
                updated[index].sizeDetails = details;
                updateVariants(updated);
              }}
            />
            <VariantPicsManager
              className="mt-6"
              photos={photos}
              imageFiles={imageFiles}
              handlePicsToDel={handlePicsToDel}
              picsToDel={picsToDel}
              index={index}
              handleImgsFile={(newPhotos) => {
                const updated = [...variants];
                updated[index].imageFiles = newPhotos;
                updateVariants(updated);
              }}
            />
          </div>
        );
      })}
      <Button
        type="button"
        className="self-center bg-transparent underline underline-offset-4 lg:text-lg text-xl text-secondary-200"
        onClick={() => {
          updateVariants([...variants, defaultVariant]);
        }}
      >
        New Variant
      </Button>
    </div>
  );
}
