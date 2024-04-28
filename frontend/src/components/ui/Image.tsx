import { HTMLAttributes, useState } from "react";

interface PropsType extends HTMLAttributes<HTMLImageElement> {
  src: string;
}
export default function Image({ src, ...props }: PropsType) {
  const [isLoading, setIsLoading] = useState(true);
  const { className, ...rest } = props;
  const defaultSIze =
    className?.includes("w-") || className?.includes("h-")
      ? ""
      : "!w-full !h-full";
  const duration = className?.includes("duration-") ? "" : "duration-150";
  const defaultObject = className?.includes("object-") ? "" : "object-cover";
  
  const parseAlt = (imageUrl: string) => {
    const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    const filenameWithoutExtension = filename.split(".").slice(0, -1).join(" ");

    const formattedText = filenameWithoutExtension.replace(/[-_]/g, " ");
    const capitalizedText = formattedText.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );

    return capitalizedText;
  };
  return (
    <img
      {...rest}
      onLoad={() => setIsLoading(false)}
      src={isLoading ? "/loading.svg" : src}
      alt={parseAlt(src)}
      className={`${
        className ? className : ""
      } ${defaultSIze} ${defaultObject} ${duration} ${
        isLoading ? "blur-md" : ""
      } `}
    />
  );
}
