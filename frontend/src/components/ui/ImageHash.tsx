import { HTMLAttributes, useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

interface PropsType extends HTMLAttributes<HTMLImageElement> {
  src: string;
  hash: string;
}
export default function ImageHash({ src, hash, ...props }: PropsType) {
  const [isLoading, setIsLoading] = useState(true);
  const { className, ...rest } = props;
  const defaultSIze =
    className?.includes("w-") || className?.includes("h-")
      ? ""
      : "!w-full !h-full";
  const duration = className?.includes("duration-") ? "" : "duration-150";
  const defaultObject = className?.includes("object-") ? "" : "object-cover";
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setTimeout(() => setIsLoading(false), 500);
    };
    img.src = src;
  }, [src]);
  return (
    <>
      <div className={isLoading ? "inline" : "hidden"}>
        <Blurhash
          {...rest}
          hash={hash}
          onLoad={() => setIsLoading(false)}
          className={`${defaultObject} ${duration} ${defaultSIze}`}
          resolutionY={32}
          resolutionX={32}
          punch={1}
        />
      </div>
      <img
        {...rest}
        onLoad={() => setIsLoading(false)}
        className={`${defaultObject} ${duration} ${defaultSIze} ${
          isLoading ? "hidden" : "inline"
        }`}
        src={src}
      />
    </>
  );
}
