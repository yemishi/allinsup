import { HTMLAttributes, useMemo, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Image, InputImg } from "../../../../../../ui";

interface PropsType extends HTMLAttributes<HTMLDivElement> {
  photos: string[];
  handlePicsToDel: (url: string) => void;
  handleImgsFile: (photos: FileList[]) => void;
  index: number;
  imageFiles?: FileList[];
  picsToDel?: string[];
}

export default function VariantPicsManager({
  photos,
  handleImgsFile,
  imageFiles = [],
  index: variantIndex,
  handlePicsToDel,
  picsToDel,
  ...props
}: PropsType) {
  const [imgsFiles, setImgsFiles] = useState(imageFiles);
  const { className, ...rest } = props;
  const imgsUrls = useMemo(() => imgsFiles.map((photo) => URL.createObjectURL(photo[0])), [imgsFiles]);

  const removePhoto = (index: number) => {
    const updated = imgsFiles.filter((_, photoIndex) => index !== photoIndex);
    setImgsFiles(updated);
    handleImgsFile(updated);
  };

  return (
    <div {...rest} className={`${className ? className : ""} flex flex-wrap gap-4 items-center`}>
      {photos &&
        photos.map((url, index) => {
          return (
            <Photo
              className={picsToDel?.includes(url) ? "opacity-50 grayscale" : ""}
              key={`${url}_${index}`}
              url={url}
              onClick={() => handlePicsToDel(url)}
            />
          );
        })}

      {imgsUrls.map((url, index) => {
        return <Photo key={`${url}_${index}`} url={url} onClick={() => removePhoto(index)} />;
      })}
      <InputImg
        id={`photos_variant_${variantIndex}`}
        onChange={(e) => {
          handleImgsFile([...imgsFiles!, e]);
          setImgsFiles([...imgsFiles!, e]);
        }}
      />
    </div>
  );
}

const Photo = ({ onClick, url, className }: { onClick: () => void; url: string; className?: string }) => (
  <div className={`relative h-20 w-20 lg:w-24 lg:h-24 group cursor-pointer ${className || ""}`}>
    <Image className="object-cover rounded-lg w-full h-full" src={url} />
    <div
      onClick={onClick}
      className=" backdrop-brightness-50 w-full h-full top-0 left-0 absolute rounded-lg hidden group-hover:flex items-center justify-center"
    >
      <RiDeleteBin5Line size={30} color="orange" />
    </div>
  </div>
);
