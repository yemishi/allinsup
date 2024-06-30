import { Link } from "react-router-dom";

export default function BrandMenu({ onClose }: { onClose: () => void }) {
  const brands = [
    "Meow Mettle",
    "Power up",
    "ZenZest",
    "Peak Potential",
    "Harmony Haven",
    "Spark Spectrum",
  ];
  return (
    <div className=" pt-3 border-t-2 border-primary-200">
      <strong>
        <h2 className="ml-3 text-lg mb-2 md:text-xl text-sky-300">Brands</h2>
      </strong>

      <ul className="flex flex-col gap-2 font-sans">
        {brands.map((brand, i) => {
          return (
            <Link
              key={`${brand}_${i}`}
              onClick={onClose}
              to={`/search?brand=${brand}`}
              className=" pl-4 py-3 hover:bg-primary-400 duration-300"
            >
              <li className="first-letter:uppercase font-lato">{brand}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
