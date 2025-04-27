import axios from "axios";
import { ProductType } from "../../../../types/response";
import { toast } from "react-toastify";

const updateVariantsPics = async (form: ProductType, picsToDel?: string[]) => {
  const variants = await Promise.all(
    form.variants.map(async (variant) => {
      if (!variant.imageFiles) return variant;

      const formData = new FormData();
      variant.imageFiles.forEach((pic) => formData.append(`files[]`, pic[0]));

      try {
        const response = await axios
          .post(`${import.meta.env.VITE_API_URL}/uploadImage/many`, formData)
          .then((res) => res.data);

        if (response.error) {
          toast.error(response.message);
          return variant;
        }

        const { imageFiles, ...rest } = variant;
        const updatedPhotos = [...variant.photos, ...response.urls];

        return {
          ...rest,
          photos: updatedPhotos,
        };
      } catch (error) {
        console.error("Upload failed:", error);
        return variant;
      }
    })
  );

  let cleanedVariants = variants;

  if (picsToDel?.length) {
    cleanedVariants = cleanedVariants.map((variant) => ({
      ...variant,
      photos: variant.photos.filter((photo) => !picsToDel.includes(photo)),
    }));
  }

  return cleanedVariants;
};

export default updateVariantsPics;
