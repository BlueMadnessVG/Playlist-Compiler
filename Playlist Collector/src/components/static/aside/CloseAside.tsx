import { motion } from "framer-motion";

function CloseAside({
  open,
  setOpen,
  Icon,
}: {
  open: boolean;
  setOpen: any;
  Icon: any;
}) {
  return (
    <motion.button
      layout
      onClick={() => setOpen(!open)}
      className="bottom-3 left-3 border-t-2 border-zinc-500"
    >
      <div className={`flex items-center p-2 ${!open && "justify-center"}`}>
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg "
        >
          <span className={` transition-transform ${!open && "rotate-180"}`}>
            <Icon />
          </span>
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-md font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}
export default CloseAside;
