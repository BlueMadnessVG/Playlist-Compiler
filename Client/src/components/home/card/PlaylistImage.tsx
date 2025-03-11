import { motion } from "framer-motion";

interface PlaylistImageProps {
  imageUrl: string;
  altText: string;
}

export function PlaylistImage({ imageUrl, altText }: PlaylistImageProps) {
  return (
    <motion.picture className="aspect-square w-full h-[40%] flex-none">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full rounded-lg shadow-inner object-none"
      />
    </motion.picture>
  );
}
