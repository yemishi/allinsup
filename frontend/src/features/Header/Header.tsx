import { memo, useRef, Suspense, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { stickyVariant } from "../../utils/helpers";
const Cart = lazy(() => import("../Cart/Cart"));
const Menu = lazy(() => import("../Menu/Menu"));

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const brand = searchParams.get("brand") ? `&brand=${searchParams.get("brand")}` : "";

  const category = searchParams.get("category") ? `&category=${searchParams.get("category")}` : "";

  const isDashboard = location.pathname.toLowerCase().includes("/dashboard");

  const isCheckout = location.pathname.toLowerCase().includes("/checkout");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFetch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;
    if (searchInput.length > 1 || brand || category) navigate(`/search?query=${searchInput}${brand}${category}`);
    else navigate("/");
  };

  const handleToHome = () => {
    navigate("/");
    if (inputRef.current) inputRef.current.value = "";
  };
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isCheckout) return <></>;
  return (
    <motion.header
      variants={stickyVariant}
      animate={isSticky ? "sticky" : "noSticky"}
      className="w-full px-5 py-3 z-20 top-0 flex flex-col gap-2 
         bg-primary-600"
    >
      <div className="flex justify-between w-full relative items-center">
        <Suspense fallback={<img src="/loading.svg" className="w-7 lg:w-10" alt="loading" />}>
          <Menu />
        </Suspense>
        <div onClick={handleToHome} className="text-white text-center cursor-pointer">
          <span className="font-montserrat text-3xl font-extrabold md:text-xl lg:text-3xl  duration-300">ALL IN</span>
        </div>

        <Suspense fallback={<img src="/loading.svg" className="w-7 lg:w-10" alt="loading" />}>
          <Cart />
        </Suspense>
      </div>

      <input
        ref={inputRef}
        onChange={handleFetch}
        type="text"
        placeholder="What you looking for?"
        className={`outline-none border-b placeholder:text-zinc-300 rounded-md p-2 text-white text-base w-[80%] lg:w-3/6 lg:text-xl bg-transparent
         self-center focus:border-secondary-600 ${isDashboard ? "hidden" : "inline"}`}
      />
    </motion.header>
  );
}

export default memo(Header);
