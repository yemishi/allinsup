import Button from "../../ui/Button,";
import EditableText from "../../ui/EditableText";
import DetailsConfig from "./DetailsConfig";
import { RiDeleteBin2Line } from "react-icons/ri";
import PhotosConfig from "./PhotosConfig";

type VariantType = {
  flavor: string;
  photos: FileList[];
  photosData?: string[];
  sizeDetails: {
    size: string;
    price: number;
    stock: number;
    isHighlight?: boolean;
    promotion?: number;
  }[];
};
interface PropsType {
  variants: VariantType[];
  defaultVariant: VariantType;
  updateVariants: (updatedVariants: VariantType[]) => void;
  suspendedPhotos: string[] | undefined;
  setSuspendedPhotos: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >;
}

export default function VariantsConfig({
  variants,
  defaultVariant,
  suspendedPhotos,
  setSuspendedPhotos,
  updateVariants,
}: PropsType) {
  const updateName = (value: string, index: number) => {
    const updatedVariants = [...variants];
    updatedVariants[index].flavor = value || `Variant ${index + 1}`;
    updateVariants(updatedVariants);
  };

  const remove = (index: number) => {
    const updated = variants.filter((_, vIndex) => vIndex !== index);
    updateVariants(updated);
  };

  const updateSuspended = (url: string) => {
    const newSuspend = suspendedPhotos?.includes(url)
      ? suspendedPhotos.filter((i) => i !== url)
      : [...(suspendedPhotos || []), url];
    setSuspendedPhotos(newSuspend);
  };
  return (
    <div className="flex flex-col gap-2 pb-4">
      {variants?.map((variant, index) => {
        const { flavor, sizeDetails, photos, photosData } = variant;

        return (
          <div key={`${variant}_${index}`} className="space-y-4 p-4 relative">
            <EditableText
              autoFocus={false}
              id={`flavor_${index}`}
              className="text-2xl lg:text-3xl self-center line-clamp-2 text-center w-[80%]"
              value={flavor}
              onChange={(e) => updateName(e.target.value, index)}
            />

            {variants.length > 1 && (
              <span
                onClick={() => remove(index)}
                className="absolute right-0 top-0 p-2 backdrop rounded-lg"
              >
                <RiDeleteBin2Line opacity="80%" size={24} />
              </span>
            )}

            <DetailsConfig
              variantIndex={index}
              details={sizeDetails}
              updateDetails={(details) => {
                const updated = [...variants];
                updated[index].sizeDetails = details;
                updateVariants(updated);
              }}
            />
            <PhotosConfig
              className="mt-6"
              photos={photos}
              photosData={photosData}
              updateSuspended={updateSuspended}
              suspendedPhotos={suspendedPhotos}
              index={index}
              updatePhotos={(newPhotos) => {
                const updated = [...variants];
                updated[index].photos = newPhotos;
                updateVariants(updated);
              }}
            />
          </div>
        );
      })}
      <Button
        type="button"
        className="self-center bg-transparent underline underline-offset-4 lg:text-lg"
        onClick={() => {
          updateVariants([...variants, defaultVariant]);
        }}
      >
        Add variant
      </Button>
    </div>
  );
}
