import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useState } from "react";
import {SearchIcon} from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../../global";

function SearchBar() {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const rotate = useMotionValue(0);
  const baseVelocity = 0.8;
  const hoverVelocity = 1.4;

  const { search, setSearch } = useSearchStore((state: any) => state);

  useAnimationFrame((_t, delta) => {
    const currentVelocity = isHovered ? hoverVelocity : baseVelocity;
    let rotateBy = 1 * currentVelocity * (delta / 10);

    rotate.set(rotate.get() + rotateBy);
  });

  const rotatingBg = useTransform(rotate, (r) => {
    return `conic-gradient(from ${r}deg, transparent 220deg, rgb(109 40 217), transparent)`;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length !== 0) navigate(`/search/${search}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className="relative w-[60%] font-abc">
      <motion.form
        className="flex justify-center items-center relative bg-zinc-950 border border-zinc-800 z-10 rounded-md group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onSubmit={handleSubmit}
      >
        <SearchIcon
          style={"ml-3 text-zinc-300 group-focus-within:text-white"}
        />
        <input
          name="searchBar"
          value={search}
          placeholder="Enter an artist, playlist or song"
          className="relative bg-zinc-950 px-3 py-2 w-full focus:outline-none rounded-md"
          onChange={handleInputChange}
        />
      </motion.form>
      <motion.div
        className="absolute -inset-[1px] rounded-md"
        style={{
          background: rotatingBg,
        }}
      ></motion.div>
    </div>
  );
}

export default SearchBar;
