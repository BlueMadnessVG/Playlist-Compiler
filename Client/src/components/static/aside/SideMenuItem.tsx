import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function SideMenuItem({
  href,
  open,
  Icon,
  title,
}: {
  href: string;
  open: boolean;
  Icon: any;
  title: string;
}) {
  const navigate = useNavigate();
  return (
    <motion.li>
      <a
        onClick={() => {
          navigate(`${href}`);
        }}
        className="flex gap-5 text-zinc-400 hover:text-zinc-100 items-end py-2 px-5 font-bold text-sm transition duration-300 font-abc cursor-pointer"
      >
        <motion.div>
          <Icon />
        </motion.div>

        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-white"
          >
            {title}
          </motion.span>
        )}
      </a>
    </motion.li>
  );
}

