import { motion } from "framer-motion";

function ImageMotion({
  profileThumbnail,
  iconPicture,
}: {
  profileThumbnail: string;
  iconPicture: string;
}) {
  return (
    <>
      <motion.picture
        variants={{
          initial: { x: 0 },
          hovered: { x: 110 },
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: 0.1,
        }}
        className="absolute w-32 -right-5 shadow-2xl  rounded-full -z-0"
      >
        <img src={profileThumbnail} className="w-full h-full rounded-full" />
      </motion.picture>
      <motion.picture
        variants={{
          initial: { x: 110, scale: 1 },
          hovered: { x: 0 },
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          delay: 0.1,
        }}
        className="absolute w-32 -right-5 shadow-2xl rounded-full -z-0"
      >
        <img src={iconPicture} className="w-full h-full rounded-full" />
      </motion.picture>
    </>
  );
}
export default ImageMotion;
