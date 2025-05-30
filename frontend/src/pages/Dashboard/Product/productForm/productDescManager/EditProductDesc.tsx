import { HTMLAttributes } from "react";
import { cleanClasses } from "../../../../../utils/helpers";
import { EditableText } from "../../../../../ui";

interface PropsType extends HTMLAttributes<HTMLDivElement> {
  desc: { title: string; text: string }[];
  updateDesc: (desc: { title: string; text: string }[]) => void;
}

export default function ProductDescManager({ updateDesc, desc, ...props }: PropsType) {
  const { className = "", ...rest } = props;
  const handleDescChange = (index: number, field: "title" | "text", value: string) => {
    const updatedDesc = [...desc];
    updatedDesc[index] = {
      ...updatedDesc[index],
      [field]: value,
    };

    updateDesc(updatedDesc);
  };
  const removeDesc = (index: number) => {
    const updatedDesc = desc.filter((_, descIndex) => index !== descIndex);
    updateDesc(updatedDesc);
  };

  return (
    <div {...rest} className={cleanClasses(className, "w-full flex flex-col")}>
      <span className="w-full flex justify-between items-center">
        <h3 className="font-montserrat text-xl text-secondary-200 font-semibold">Product Description</h3>
        <button
          type="button"
          className="h-8 w-8 md:w-11 md:h-11 md:text-xl hover:bg-primary-600 duration-200 bg-primary border 
                border-primary-300 font-anton font-bold text-lg rounded-full ml-auto mb-3"
          onClick={() =>
            updateDesc([
              ...desc,
              {
                text: `text ${desc.length + 1}`,
                title: `title ${desc.length + 1}`,
              },
            ])
          }
        >
          +
        </button>
      </span>

      {desc && (
        <table className="w-full mt-2">
          <tbody className="text-left flex flex-col font-lato text-sm md:text-base rounded-2xl ">
            {desc.map((description, index) => {
              const { text, title } = description;
              const last = index === desc.length - 1;
              const first = index === 0;
              return (
                <tr key={`${description}_${index}`} className="grid grid-cols-2 w-full first:rounded-tl-lg relative">
                  <td
                    className={`${last && "rounded-bl-lg border-none"} ${
                      first && "rounded-tl-lg"
                    } border-b border-b-primary-200 bg-primary-400 md:py-5 pl-2 pr-4 py-3 `}
                  >
                    <EditableText
                      value={title}
                      placeholder={title}
                      onChange={(e) => handleDescChange(index, "title", e.target.value)}
                      type="text"
                    />
                  </td>

                  <td
                    className={`relative bg-secondary-200 flex items-center pl-2 bg-opacity-40 border-b border-b-primary-200  ${
                      last && "rounded-br-lg border-none"
                    } ${first && "rounded-tr-lg"}`}
                  >
                    <EditableText
                      placeholder={text}
                      value={text}
                      onChange={(e) => handleDescChange(index, "text", e.target.value)}
                      type="text"
                    />

                    {desc.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDesc(index)}
                        className={`absolute right-0  text-center
                               top-0 bg-primary w-6 h-6 md:w-8 md:h-8 hover:bg-primary-600 duration-200 font-lato text-white 
                               text-sm md:text-base rounded-bl-lg font-extrabold z-20 
                               
                               ${last && "rounded-bl-lg "} ${first && "rounded-tr-lg"}`}
                      >
                        x
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
