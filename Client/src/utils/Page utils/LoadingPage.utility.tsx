import { motion } from "framer-motion";

const loaderVariants = {
  animationLoop: {
    x: [-5, 10, 20, 30, 40],
    y: [0, -25, 0, -25, 0],
    opacity: [1, 1, 1, 1, 1, 0],
  },
};

const dotTransition = (delay: number) => ({
  duration: 0.8,
  times: [0, 1],
  repeat: Infinity,
  repeatType: "loop" as const,
  ease: "easeIn",
  repeatDelay: 1,
  delay: delay, // Add a delay based on the child's position
});

function LoadingPage() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2">
      <motion.div
        className="w-[10px] h-[10px] m-[10px] rounded-full bg-white"
        variants={loaderVariants}
        animate="animationLoop"
        transition={dotTransition(0)}
      ></motion.div>
      <motion.div
        className="w-[10px] h-[10px] m-[10px] rounded-full bg-white"
        variants={loaderVariants}
        animate="animationLoop"
        transition={dotTransition(0.2)}
      ></motion.div>
      <motion.div
        className="w-[10px] h-[10px] m-[10px] rounded-full bg-white"
        variants={loaderVariants}
        animate="animationLoop"
        transition={dotTransition(0.4)}
      ></motion.div>
      <motion.div
        className="w-[10px] h-[10px] m-[10px] rounded-full bg-white"
        variants={loaderVariants}
        animate="animationLoop"
        transition={dotTransition(0.6)}
      ></motion.div>
    </div>
  );
}
export default LoadingPage;
