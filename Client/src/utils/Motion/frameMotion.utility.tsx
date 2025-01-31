import { motion, useIsPresent } from "framer-motion";

function FrameMotion() {
  const isPresent = useIsPresent();

  return (
    <motion.div
      initial={{ scaleX: 1 }}
      animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
      exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
      style={{ originX: isPresent ? 0 : 1 }}
      className="absolute top-0 left-0 right-0 bottom-0 bg-violet-900 z-50 h-100%"
    />
  );
}
export default FrameMotion;
