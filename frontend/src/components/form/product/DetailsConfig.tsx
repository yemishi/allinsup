import EditableText from "../../ui/EditableText";

import { DetailsType } from "../../../types/response";
import Button from "../../ui/Button,";
import { LuDelete } from "react-icons/lu";
import { parseLocalCurrency } from "../../../utils/formatting";
interface PropsType {
  details: DetailsType[];
  updateDetails: (details: DetailsType[]) => void;
  variantIndex: number;
}

export default function DetailsConfig({
  details,
  updateDetails,
  variantIndex,
}: PropsType) {
  const add = () => {
    const update: DetailsType[] = [
      ...details,
      { price: 2222, size: "20ml", stock: 10 },
    ];
    updateDetails(update);
  };
  const remove = (index: number) => {
    const updated = details.filter((_, sizeIndex) => sizeIndex !== index);
    updateDetails(updated);
  };
  return (
    <div className="flex flex-col relative">
      {details.map((detail, sizeIndex) => {
        const { price, size, stock, isHighlight, promotion } = detail;
        return (
          <div
            className="text-lg flex flex-col relative lg:text-xl"
            key={`${variantIndex}_${detail}_${sizeIndex}`}
          >
            <div
              className={`text-center my-2 relative ${
                sizeIndex === 0 ? "" : "border-t pt-2"
              }`}
            >
              {details.length > 1 && (
                <button
                  onClick={() => remove(sizeIndex)}
                  type="button"
                  className="absolute h-7 w-7 top-2/4 mt-1 -translate-y-2/4  left-0"
                >
                  <LuDelete className="!h-full !w-full !text-red-500" />
                </button>
              )}
              <span className="text-sky-300">{`Size ${sizeIndex + 1}`}</span>
            </div>

            <EditableText
              autoFocus={false}
              label="Size:"
              className="text-secondary-300"
              flexRow
              value={size}
              onChange={(e) => {
                const { value } = e.target;
                const updated = [...details];
                details[sizeIndex].size = value;
                updateDetails(updated);
              }}
            />

            <EditableText
              autoFocus={false}
              label="Price:"
              flexRow
              className="text-secondary-300"
              value={parseLocalCurrency(price)}
              onChange={(e) => {
                const { value } = e.target;
                const numberValue = Number(value.replace(/[^0-9.-]+/g, ""));
                const updated = [...details];
                details[sizeIndex].price = numberValue;
                updateDetails(updated);
              }}
            />
            <EditableText
              autoFocus={false}
              label="Stock:"
              type="number"
              className="text-secondary-300"
              flexRow
              value={String(stock)}
              onChange={(e) => {
                const updated = [...details];
                details[sizeIndex].stock = Number(e.target.value);

                updateDetails(updated);
              }}
            />
            <span
              className="flex gap-1 w-max"
              onClick={() => {
                const updated = [...details];
                details[sizeIndex].isHighlight = !isHighlight;

                updateDetails(updated);
              }}
            >
              <span>Is highlight?</span>{" "}
              <span className="text-secondary-300">
                {isHighlight ? "Yes" : "No"}
              </span>
            </span>

            <span className="flex gap-1">
              <span
                onClick={() => {
                  const updated = [...details];
                  details[sizeIndex].promotion = promotion ? undefined : 22;
                  updateDetails(updated);
                }}
              >
                Promotion?
              </span>
              <span className="text-secondary-300">
                {promotion ? (
                  <EditableText
                    autoFocus={false}
                    value={promotion.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                    onChange={(e) => {
                      const updated = [...details];
                      const { value } = e.target;
                      const numberValue = Number(
                        value.replace(/[^0-9.-]+/g, "")
                      );
                      details[sizeIndex].promotion = numberValue;
                      updateDetails(updated);
                    }}
                  />
                ) : (
                  "No"
                )}
              </span>
            </span>
          </div>
        );
      })}
      <Button
        type="button"
        onClick={add}
        className="absolute right-0 py-1 my-2  lg:py-2 lg:px-4 rounded-full bg-primary-400 border"
      >
        +
      </Button>
    </div>
  );
}