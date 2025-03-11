import { motion } from "framer-motion";

import ImageMotion from "../../utils/Motion/ImageMotion.utility";
import FlipTitle from "../../utils/Motion/TittleMotion.utility";
import { ReactNode } from "react";

interface ProfileButtonProps {
  children: ReactNode;
  icon: string;
  thumb: string;
  style: string;
}

export function ProfileButton({ children, icon, thumb, style }: ProfileButtonProps) {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative flex items-center overflow-hidden p-4 pr-32 pt-6 rounded-md bg-gradient-to-r ${style}`}
    >
      <div className="z-10">
        <FlipTitle>{children}</FlipTitle>
      </div>
      <ImageMotion profileThumbnail={thumb ? thumb : icon} iconPicture={icon} />
    </motion.div>
  );
}

