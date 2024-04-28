import { HTMLAttributes, useMemo, useState } from "react";
import InputImage from "../../ui/InputImg";
import { RiDeleteBin5Line } from "react-icons/ri";
import Image from "../../ui/Image";

interface PropsType extends HTMLAttributes<HTMLDivElement> {
  photos: FileList[];
  photosData?: string[];
  suspendedPhotos?: string[];
  updateSuspended: (url: string) => void;
  updatePhotos: (photos: FileList[]) => void;
  index: number;
}

export default function PhotosConfig({
  photos: initialPhotos,
  updatePhotos,
  photosData,
  index: variantIndex,
  updateSuspended,
  suspendedPhotos,
  ...props
}: PropsType) {
  const [photos, setPhotos] = useState<FileList[]>(initialPhotos);
  const { className, ...rest } = props;
  const photosUrls = useMemo(
    () => photos.map((photo) => URL.createObjectURL(photo[0])),
    [photos]
  );

  const removePhoto = (index: number) => {
    const updated = photos.filter((_, photoIndex) => index !== photoIndex);
    setPhotos(updated);
    updatePhotos(updated);
  };

  return (
    <div
      {...rest}
      className={`${
        className ? className : ""
      } flex flex-wrap gap-4 items-center`}
    >
      {photosData &&
        photosData.map((url, index) => {
          return (
            <Photo
              className={
                suspendedPhotos?.includes(url) ? "opacity-50 grayscale" : ""
              }
              key={`${url}_${index}`}
              url={url}
              onClick={() => updateSuspended(url)}
            />
          );
        })}

      {photosUrls.map((url, index) => {
        return (
          <Photo
            key={`${url}_${index}`}
            url={url}
            onClick={() => removePhoto(index)}
          />
        );
      })}
      <InputImage
        id={`photos_variant_${variantIndex}`}
        onChange={(e) => {
          updatePhotos([...photos, e]);
          setPhotos([...photos, e]);
        }}
      />
    </div>
  );
}

const Photo = ({
  onClick,
  url,
  className,
}: {
  onClick: () => void;
  url: string;
  className?: string;
}) => (
  <div className={`relative h-20 w-20 lg:w-24 lg:h-24 group ${className || ""}`}>
    <Image className="object-cover rounded-lg w-full h-full" src={url} />
    <div
      onClick={onClick}
      className=" backdrop-brightness-50 w-full h-full top-0 left-0 absolute rounded-lg hidden group-hover:flex items-center justify-center"
    >
      <RiDeleteBin5Line size={30} color="orange" />
    </div>
  </div>
);
