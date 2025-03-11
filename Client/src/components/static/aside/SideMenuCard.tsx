import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SideMenuCard({
  item,
  type,
  open,
}: {
  item: any;
  type: string;
  open: boolean;
}) {
  const navigate = useNavigate();
  return (
    <motion.a
      onClick={() => {
        navigate(
          `${
            type === "playlist" ? `/playlist/youtube/user/` : `/artist/youtube/`
          }${item.id}`
        );
      }}
      className="item-item flex relative p-1 gap-2 overflow-hidden items-center rounded-md hover:bg-zinc-700 transition duration-200 cursor-pointer max-w-[200px]"
    >
      <picture className="h-12 w-12 flex-none">
        <img
          src={item?.snippet.thumbnails.default.url}
          alt={`item from ${item.from}`}
          className={`object-none w-full h-full shadow-md shadow-zinc-700/90 ${
            type === "playlist" ? "rounded-md" : "rounded-full"
          } `}
        />
      </picture>

      {open && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="flex flex-auto flex-col truncate font-abc"
        >
          <h4 className=" text-sm"> {item?.snippet.title} </h4>
          <span className="text-xs text-gray-500 pt-1 capitalize">{type}</span>
        </motion.div>
      )}
    </motion.a>
  );
}

export default SideMenuCard;
