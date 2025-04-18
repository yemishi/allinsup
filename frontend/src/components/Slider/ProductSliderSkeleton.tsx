import Skeleton from "react-loading-skeleton";
import Slider, { Slide } from "./Slider";
import isMobile from "../../utils/isMobile";

export default function ProductSliderSkeleton({ count }: { count?: number }) {
  const mob = isMobile();
  const settings = {
    spaceBetween: 20,
    freeMode: true,
    slidesPerView: 2,
    navigation: !mob,

    style: {
      background: "linear-gradient(transparent,#161616)",
      width: "100%",
      bottom: 0,
      zIndex: 10,
    },

    breakpoints: {
      460: {
        slidesPerView: 2.2,
      },
      550: {
        slidesPerView: 2.5,
      },
      650: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3.3,
      },
      1024: {
        slidesPerView: 3.6,
      },
      1200: {
        slidesPerView: 4.7,
      },
    },
  };
  return (
    <Slider settings={settings}>
      {Array.from({ length: count || 10 }).map((_, index) => (
        <Slide
          key={`slide-${index}`}
          className="group border border-primary-200 !flex rounded-xl text-sm bg-primary-500 font-lato 
          pb-4 min-h-[310px] md:min-h-[370px] lg:min-h-[400px] text-white flex-col justify-between md:text-base lg:text-lg"
        >
          <Skeleton className="w-full h-[172px] md:h-[202px] lg:h-[212px] !rounded-lg" />
          <div className="flex flex-col p-2 pb-0 gap-4 ">
            <Skeleton className="w-full h-7 !rounded-lg" />
            <Skeleton className="w-14 h-7 !rounded-lg" />
            <Skeleton className="!w-[80%] h-10 !rounded-lg  ml-[10%] " />
          </div>
        </Slide>
      ))}
    </Slider>
  );
}
