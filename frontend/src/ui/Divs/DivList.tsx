import { HTMLAttributes } from "react";
import { cleanClasses } from "../../utils/helpers";

interface ListPops extends HTMLAttributes<HTMLDivElement> {
  dt: string;
  dd: string;
}
export default function DivList({ dd, dt, ...props }: ListPops) {
  const { className = "", ...rest } = props;
  return (
    <div {...rest} className={cleanClasses(className, "flex gap-1 w-full justify-between pb-2 0 px-2")}>
      <dt className="font-semibold">{dt}</dt>
      <dd className="font-bold text-secondary-500 text-right">{dd}</dd>
    </div>
  );
}
