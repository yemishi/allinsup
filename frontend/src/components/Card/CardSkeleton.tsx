import Skeleton from "react-loading-skeleton";

export default function CardSkeleton() {
  return (
    <div
      className="flex hover:shadow-lightOn duration-300  flex-col flex-1 min-w-[165px] max-w-[250px] 
    md:min-w-[185px] border border-primary-200 lg:min-w-[250px] lg:max-w-[280px] lg:h-[342px]  bg-primary-500 p-1 md:p-2 gap-2 pb-2 md:pb-3 md:gap-4 rounded-lg"
    >
      <Skeleton className="w-full h-52 !rounded-lg" />
      <Skeleton className="w-full h-5 !rounded-lg" />
      <div className="flex justify-between">
        <Skeleton className="!w-12 h-7 !rounded-lg lg:w-16 lg:h-9" />
        <Skeleton className="!w-12 h-8 !rounded-lg lg:!w-14 lg:h-9" />
      </div>
    </div>
  );
}
