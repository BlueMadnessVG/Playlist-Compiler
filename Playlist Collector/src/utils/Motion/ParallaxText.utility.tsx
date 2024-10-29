import { useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { wrap } from "@motionone/utils";

function ParallaxText({ children }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(0);
  const baseVelocity = -1;
  const hoverVelocity = -0.4;

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  useAnimationFrame((_t, delta) => {
    const currentVelocity = isHovered ? hoverVelocity : baseVelocity;
    let moveBy = 1 * currentVelocity * (delta / 1000);

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden tracking-normal leading-3 m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div
        onMouseEnter={() => setIsHovered(!isHovered)}
        onMouseLeave={() => setIsHovered(!isHovered)}
        className=" uppercase flex whitespace-nowrap flex-nowrap text-lg"
        style={{ x }}
      >
        <span className="block mr-1"> {children} </span>
        <span className="block mr-1"> {children} </span>
        <span className="block mr-1"> {children} </span>
        <span className="block mr-1"> {children} </span>
      </motion.div>
    </div>
  );
}
export default ParallaxText;
