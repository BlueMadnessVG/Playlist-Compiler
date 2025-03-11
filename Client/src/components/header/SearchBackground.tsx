import { useMotionValue, useAnimationFrame, useTransform, motion } from "framer-motion";
import { useState } from "react";

export function SearchBackground() {
  const [isHovered, setIsHovered] = useState(false);
  const rotate = useMotionValue(0);
  const baseVelocity = 0.8;
  const hoverVelocity = 1.4;

  useAnimationFrame((_t, delta) => {
    const currentVelocity = isHovered ? hoverVelocity : baseVelocity;
    let rotateBy = 1 * currentVelocity * (delta / 10);

    rotate.set(rotate.get() + rotateBy);
  });

  const rotatingBg = useTransform(rotate, (r) => {
    return `conic-gradient(from ${r}deg, transparent 220deg, rgb(109 40 217), transparent)`;
  });

  return (
    <motion.div
      className="absolute -inset-[1px] rounded-md"
      style={{ background: rotatingBg }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
}
