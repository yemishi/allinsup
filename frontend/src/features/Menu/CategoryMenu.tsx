import { Link } from "react-router-dom";
export default function CategoryMenu({ onClose }: { onClose: () => void }) {
  const categories = ["whey", "creatine", "pre-workout", "Vitamins & Minerals"];
  return (
    <div className="pt-3">
      <h2 className="ml-3 text-lg md:text-xl mb-2 text-sky-300">
        <strong>Category</strong>
      </h2>
      <ul className="flex flex-col gap-2 font-sans">
        {categories.map((category, i) => {
          return (
            <Link
              onClick={onClose}
              key={`${category}_${i}`}
              to={`/search?category=${category}`}
              className="pl-4 py-3 hover:bg-primary-400 duration-300"
            >
              <li className="first-letter:uppercase">{category}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
