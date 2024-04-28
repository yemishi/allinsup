import { memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { stickyVariant } from "../../utils/helpers";
import Cart from "../Cart/Cart";
import Menu from "../Menu/Menu";

function Header() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFetch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;
    if (searchInput.length > 1) navigate(`/search?query=${searchInput}`);
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

  return (
    <motion.header
      variants={stickyVariant}
      animate={isSticky ? "sticky" : "noSticky"}
      className="w-full px-5 py-3  z-20 top-0 flex flex-col gap-2 
         bg-primary-600"
    >
      <div className="flex justify-between w-full relative items-center">
        <Menu />

        <div
          onClick={handleToHome}
          className="text-white text-center cursor-pointer"
        >
          <span className="font-montserrat text-3xl font-extrabold md:text-xl lg:text-3xl  duration-300">
            ALL IN
          </span>
        </div>

        <Cart />
      </div>

      <input
        onChange={handleFetch}
        ref={inputRef}
        type="text"
        placeholder="What you looking for"
        className="outline-none border-b placeholder:text-zinc-300 rounded-md p-2 text-white text-base w-[80%] lg:w-3/6 lg:text-xl bg-transparent
         self-center focus:border-secondary-600"
      />
    </motion.header>
  );
}

export default memo(Header);
