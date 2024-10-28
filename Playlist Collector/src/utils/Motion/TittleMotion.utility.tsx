import { motion } from "framer-motion";

const _DURATION = 0.25;
const _STAGGER = 0.025;

function FlipTitle({ children }: any) {
  return (
    <motion.div
      className="relative p-1 block overflow-hidden whitespace-nowrap text-xl font-black sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((letter: string, i: number) => (
          <motion.span
            variants={{
              initial: {
                y: -5,
              },
              hovered: {
                y: -100,
              },
            }}
            transition={{
              duration: _DURATION,
              ease: "easeInOut",
              delay: _STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((letter: string, i: number) => (
          <motion.span
            variants={{
              initial: {
                y: 100,
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: _DURATION,
              ease: "easeInOut",
              delay: _STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
export default FlipTitle;
