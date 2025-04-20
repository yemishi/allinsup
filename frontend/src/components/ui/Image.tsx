import React, { HTMLAttributes, useMemo, useState } from "react";
import { cleanClasses } from "../../utils/helpers";

interface PropsType extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

function parseAlt(src: string) {
  return decodeURIComponent(src)
    .split("/")
    .pop()!
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const Image: React.FC<PropsType> = React.memo(({ src, className, width, height, alt, ...rest }) => {
  const [loaded, setIsLoaded] = useState(false);
  const classes = useMemo(
    () => cleanClasses(className, `${!loaded ? "blur-md opacity-60" : ""} w-full h-full object-cover duration-150`),
    [className,loaded]
  );
  return (
    <img
      src={src}
      onLoad={() => setIsLoaded(true)}
      alt={alt ?? parseAlt(src)}
      width={width}
      height={height}
      className={classes}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
});

Image.displayName = "Image";

export default Image;
