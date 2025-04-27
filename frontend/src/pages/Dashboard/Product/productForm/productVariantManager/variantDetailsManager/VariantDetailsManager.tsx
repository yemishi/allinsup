import { ChangeEvent } from "react";
import { DetailsType } from "../../../../../../types/response";
import { Input } from "../../../../../../ui";
import { MdCancel } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
interface PropsType {
  details: DetailsType[];
  updateDetails: (details: DetailsType[]) => void;
  sizeDetailErrors?: Record<
    number,
    {
      size?: string | null;
      price?: string | null;
      stock?: string | null;
    }
  >;
  variantIndex: number;
}

export default function VariantDetailsManager({ details, updateDetails, variantIndex, sizeDetailErrors }: PropsType) {
  const add = () => {
    const update: DetailsType[] = [...details, { price: 22, size: "20ml", stock: 10 }];
    updateDetails(update);
  };
  const remove = (index: number) => {
    const updated = details.filter((_, sizeIndex) => sizeIndex !== index);
    updateDetails(updated);
  };
  const handleDetailChange = (sizeIndex: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = [...details];
    (updated[sizeIndex] as any)[name] = name === "size" ? value : Number(value);
    updateDetails(updated);
  };

  const togglePromotion = (sizeIndex: number, promotion?: number) => {
    const updated = [...details];
    details[sizeIndex].promotion = promotion ? undefined : 22;
    updateDetails(updated);
  };
  return (
    <div className="flex flex-col relative">
      {details.map((detail, sizeIndex) => {
        const error = sizeDetailErrors && sizeDetailErrors[sizeIndex];
        const { price, size, stock, isHighlight, promotion } = detail;
        return (
          <div
            className="text-lg flex flex-col relative lg:text-xl gap-5 "
            key={`${variantIndex}_${detail}_${sizeIndex}`}
          >
            <div className={`my-2 text-center relative ${sizeIndex === 0 ? "" : "border-t border-primary-200 pt-4"}`}>
              {details.length > 1 && (
                <button
                  onClick={() => remove(sizeIndex)}
                  type="button"
                  className="absolute h-7 w-7 top-2/4 mt-1 -translate-y-2/4 left-0 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  <MdCancel className="h-full w-full text-red-300" />
                </button>
              )}
              <span className="text-secondary-200 font-montserrat font-semibold">{`Size ${sizeIndex + 1}`}</span>
            </div>

            <Input
              label="Size"
              name="size"
              error={(error && error.size) ?? ""}
              className="self-center"
              value={size}
              onChange={(e) => handleDetailChange(sizeIndex, e)}
            />

            <Input
              label="Price"
              name="price"
              className="self-center"
              error={(error && error.price) ?? ""}
              value={price}
              type="number"
              onChange={(e) => handleDetailChange(sizeIndex, e)}
            />
            <Input
              label="Stock"
              name="stock"
              type="number"
              error={(error && error.stock) ?? ""}
              className="self-center"
              value={String(stock)}
              onChange={(e) => handleDetailChange(sizeIndex, e)}
            />

            <span
              className="flex gap-1 w-max cursor-pointer hover:scale-105 active:scale-95 transition-all"
              onClick={() => {
                const updated = [...details];
                details[sizeIndex].isHighlight = !isHighlight;

                updateDetails(updated);
              }}
            >
              <span>Is highlight?</span> <span className="text-secondary-300">{isHighlight ? "Yes" : "No"}</span>
            </span>

            <span className="flex gap-1">
              <span
                className="cursor-pointer hover:scale-105 active:scale-95 transition-all"
                onClick={() => togglePromotion(sizeIndex, promotion)}
              >
                Promotion?
              </span>

              {promotion ? (
                <Input
                  label="value"
                  autoFocus
                  name="promotion"
                  value={promotion}
                  className="self-center"
                  type="number"
                  onChange={(e) => handleDetailChange(sizeIndex, e)}
                />
              ) : (
                <span
                  onClick={() => togglePromotion(sizeIndex, promotion)}
                  className="text-secondary-300 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  No
                </span>
              )}
            </span>
          </div>
        );
      })}
      <IoIosAddCircle
        onClick={add}
        size={30}
        className="absolute right-0 mt-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
      />
    </div>
  );
}
