import { HTMLAttributes } from "react";

interface ListPops extends HTMLAttributes<HTMLDivElement> {
  dt: string;
  dd: string;
}
const DivList = ({ dd, dt, ...props }: ListPops) => {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      className={`flex gap-1 w-full justify-between pb-2 0 px-2 ${
        className ? className : ""
      }`}
    >
      <dt className="font-thin">{dt}</dt>
      <dd className="font-bold text-secondary-500">{dd}</dd>
    </div>
  );
};

export { DivList };
