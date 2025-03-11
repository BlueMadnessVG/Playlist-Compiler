import { motion, useAnimation } from "framer-motion";
import { useRef, useState } from "react";
import { wrap } from "@motionone/utils";
import {ArrowRightIcon, ArrowLeftIcon} from "../../assets/icons/";

function CarouselMotion({ children, items_length }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [page, setPage] = useState(0);
  const [childrenOnScreen, setChildrenOnScreen] = useState(0);

  const currentIndex = wrap(0, items_length, page);

  const _gap = 8;
  const _gapSum = (items_length - 1) * _gap;

  const paginate = (newDirection: number) => {
    setPage((p) => p + newDirection);
  };

  const calcX = (index: number): number => {
    if (!carouselRef.current) return 0;

    const childWidth =
      (carouselRef.current.offsetWidth - _gapSum) / items_length;
    return index * childWidth + index * _gap;
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div ref={containerRef} className="overflow-x-hidden cursor-grab">
      {page > 0 && (
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="absolute left-1 top-0 h-full flex items-center rounded-full z-10"
        >
          <span className="rounded-full bg-violet-900 p-3 shadow-xl shadow-zinc-800">
            <ArrowLeftIcon />
          </span>
        </motion.div>
      )}
      <motion.div
        ref={carouselRef}
        drag="x"
        animate={controls}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 400,
        }}
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        style={{ display: "flex", gap: _gap }}
        className="w-fit"
        onDragEnd={(_e, { velocity, offset, point }) => {
          if (!carouselRef.current || !containerRef.current) return;

          const swipe = swipePower(offset.x, velocity.x);
          const isRightDirection = offset.x > 45 && velocity.x >= 0;

          const isPointOkay = point.x !== 0 && point.y !== 0;
          const isLeftDirection =
            offset.x < -45 && velocity.x <= 0 && isPointOkay;

          const childW =
            (carouselRef.current.offsetWidth - _gapSum) / items_length;

          const carouselDiments = carouselRef.current.getBoundingClientRect();
          const containerDiments = containerRef.current.getBoundingClientRect();

          const isPassedBoundaries =
            containerDiments.right > carouselDiments.right - childW;

          let newCurrIndex = currentIndex;
          let switchSliderBy = Math.ceil(-offset.x / (childW + _gap));

          if (swipe > swipeConfidenceThreshold || isRightDirection) {
            switchSliderBy -= 1;

            newCurrIndex =
              currentIndex > 0 ? currentIndex + switchSliderBy : currentIndex;
            if (newCurrIndex < 0) newCurrIndex = 0;

            const indexDiff = newCurrIndex - currentIndex;
            if (indexDiff < 0) {
              switchSliderBy = indexDiff;
            }

            if (currentIndex > newCurrIndex) {
              paginate(switchSliderBy);
            }
          } else if (swipe > swipeConfidenceThreshold || isLeftDirection) {
            const lastIndex = items_length - 1;

            newCurrIndex =
              currentIndex < lastIndex
                ? currentIndex + switchSliderBy
                : currentIndex;
            if (newCurrIndex > lastIndex) newCurrIndex = lastIndex;
            if (isPassedBoundaries) {
              setChildrenOnScreen(
                Math.floor(containerRef.current.offsetWidth / childW)
              );
              newCurrIndex = items_length - childrenOnScreen;
            }

            const indexDiff = newCurrIndex - currentIndex;
            if (switchSliderBy > indexDiff) {
              switchSliderBy = indexDiff;
            }

            if (currentIndex < newCurrIndex) {
              paginate(switchSliderBy);
            }
          }

          if (isPassedBoundaries && currentIndex <= newCurrIndex) {
            const rightEdge =
              -carouselRef.current.offsetWidth +
              containerRef.current.offsetWidth;

            controls.start({ x: rightEdge });
          } else {
            controls.start({ x: -calcX(newCurrIndex) });
          }
        }}
      >
        {children}
      </motion.div>
      {page < items_length - childrenOnScreen && (
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="absolute right-1 top-0 h-full flex items-center rounded-full"
        >
          <span className="rounded-full bg-violet-900 p-3 shadow-xl shadow-zinc-800">
            <ArrowRightIcon />
          </span>
        </motion.div>
      )}
    </div>
  );
}
export default CarouselMotion;
