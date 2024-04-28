import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import {
  MdOutlineLocalShipping,
  MdOutlinePending,
  MdOutlinePendingActions,
} from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

export default function Track({
  status,
  updateState,
}: {
  status: string;
  updateState?: (index: number) => void;
}) {
  const track = [
    { Icon: MdOutlinePendingActions, stage: "Pending" },
    { Icon: MdOutlinePending, stage: "Processing" },
    { Icon: MdOutlineLocalShipping, stage: "Shipped" },
    { Icon: TbTruckDelivery, stage: "Out for delivery" },
    { Icon: AiOutlineDeliveredProcedure, stage: "Delivered" },
  ];

  return (
    <div
      className="w-full max-w-md flex flex-col gap-7 md:self-center after:h-[95%] md:after:h-[85%] after:border after:absolute relative after:mt-2 after:ml-4
   after:border-secondary-200 after:border-dashed md:after:ml-5"
    >
      {track.map(({ Icon, stage }, index) => {
        const findIndex = track.findIndex(
          ({ stage }) =>
            stage.toLocaleLowerCase() === status.toLocaleLowerCase()
        );

        return (
          <div key={`${stage}_${index}`} className="w-full flex lg:text-lg">
            <div className="flex font-medium gap-2 items-center duration-300 w-full">
              <span
                onClick={() => (updateState ? updateState(index) : null)}
                className={`p-4 md:p-5 rounded-full duration-300 border-2 border-primary-400 z-10 ${
                  findIndex >= index
                    ? "bg-secondary-200 border-secondary-200 shadow-lightOn"
                    : "bg-primary-600"
                } `}
              />
              <span
                className={`self-center ${
                  findIndex >= index ? "text-secondary-200" : "text-gray-400"
                }`}
              >
                {stage}
              </span>
            </div>

            <div className="w-9 h-9 md:w-12 md:h-12">
              <Icon className="w-7 h-7 md:w-9 md:h-9" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
