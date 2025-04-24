import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import VariantsConfig from "./VariantsConfig";
import { useState } from "react";
import { Button, Input } from "../../../ui";
import { IoCaretBack } from "react-icons/io5";
import { ProductFormType, ProductType, VariantType } from "../../../types/response";
import Description from "./EditProductDesc";

interface VariantData extends Omit<VariantType, "photos"> {
  photos: [];
}

export default function ProductForm({
  onClose,
  defaultValues,
  action,
}: {
  onClose: () => void;
  action: (form: ProductFormType, photosDelete?: string[]) => Promise<void>;
  defaultValues?: Omit<ProductType, "variants"> & {
    variants: VariantData[];
  };
}) {
  type FormInputType = z.infer<typeof FormSchema>;
  type FormVariantType = typeof formVariants;
  interface VariantType extends FormVariantType {
    photosData?: string[];
  }
  const SizeDetailsSchema = z.array(
    z.object({
      size: z.string(),
      price: z.number(),
      stock: z.number(),
      isHighlight: z.boolean().optional(),
      promotion: z.number().optional(),
    })
  );
  const FormSchema = z.object({
    name: z.string().min(1, "this field is required"),
    brand: z.string().min(1, "this field is required"),
    category: z.string().min(1, "this field is required"),
    desc: z.array(z.object({ title: z.string(), text: z.string() })),
    variants: z.array(
      z.object({
        flavor: z.string(),
        sizeDetails: SizeDetailsSchema,
        photos: z.array(z.instanceof(FileList)),
        photosData: z.array(z.string()).optional(),
      })
    ),
  });

  const defaultVariant = (qtd: number) => {
    return {
      flavor: `variant ${qtd}`,
      photos: [],
      sizeDetails: [
        {
          price: 22.22,
          size: "20g",
          stock: 10,
        },
      ],
    };
  };
  const [variants, setVariants] = useState<VariantType>(defaultValues?.variants || [defaultVariant(1)]);
  const [isLoading, setIsLoading] = useState(false);
  const [suspendedPhotos, setSuspendedPhotos] = useState<string[]>();
  const [desc, setDesc] = useState<{ title: string; text: string }[]>(
    defaultValues?.desc || [{ title: "Title 1", text: "Text 1" }]
  );

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputType>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  const formVariants = getValues("variants");
  const onSubmit: SubmitHandler<FormInputType> = async (values) => {
    setValue("variants", variants);
    setValue("desc", desc);
    await FormSchema.parseAsync(values);
    setIsLoading(true);
    await action(values, suspendedPhotos);
    setIsLoading(false);
  };
  return (
    <form className="w-full h-full flex flex-col pt-4 px-4 gap-2 overflow-x-hidden" onSubmit={handleSubmit(onSubmit)}>
      <div className="font-montserrat text-center text-2xl lg:text-3xl font-semibold mb-6 relative ">
        <button type="button" onClick={onClose} className="h-8 w-8 absolute top-2/4 -translate-y-2/4  left-0">
          <IoCaretBack className="!h-full !w-full" />
        </button>
        <span>Product</span>
      </div>

      <Input
        autoComplete="no"
        disabled={isLoading}
        {...register("name")}
        error={errors.name?.message}
        label="Name"
        placeholder="product name"
      />
      <Input
        autoComplete="no"
        disabled={isLoading}
        error={errors.brand?.message}
        {...register("brand")}
        label="Brand"
        placeholder="product brand"
      />
      <Input
        autoComplete="no"
        disabled={isLoading}
        error={errors.category?.message}
        {...register("category")}
        label="Category"
        placeholder="product category"
      />

      <VariantsConfig
        updateVariants={(updatedVariants: VariantType) => {
          setVariants(updatedVariants);
        }}
        defaultVariant={defaultVariant(variants.length + 1)}
        variants={variants}
        suspendedPhotos={suspendedPhotos}
        setSuspendedPhotos={setSuspendedPhotos}
      />
      <Description updateDesc={(updated: { text: string; title: string }[]) => setDesc(updated)} desc={desc} />
      <Button
        disabled={isLoading}
        onClick={() => {
          setValue("variants", variants);
          setValue("desc", desc);
        }}
        type="submit"
        className="self-center sticky bottom-4 bg-secondary-600 py-2 my-4 lg:text-lg"
      >
        Submit
      </Button>
    </form>
  );
}
