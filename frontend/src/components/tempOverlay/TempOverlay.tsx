import { useTempOverlay } from "../../context/Provider";
import React from "react";

export default function TempOverlay() {
  const { children, className, close } = useTempOverlay();
  if (!children) return;

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  const positionX =
    className?.includes("left-") || className?.includes("right-")
      ? ""
      : "left-0";
  const positionY =
    className?.includes("top-") || className?.includes("bottom-")
      ? ""
      : "top-0";
  const width = className?.includes("w-") ? "" : "w-full";
  const height = className?.includes("h-") ? "" : "h-full";
  const backDrop =
    className?.includes("backdrop") || className?.includes("bg-")
      ? ""
      : "backdrop-brightness-75";
  return (
    <div
      onClick={handleClick}
      className={`${
        className ? className : ""
      }  ${positionX} ${positionY} ${width} ${height} ${backDrop} flex z-20 justify-center items-center fixed `}
    >
      {children}
    </div>
  );
}
