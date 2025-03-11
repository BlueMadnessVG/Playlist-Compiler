import { motion } from "framer-motion";

interface PageHeaderProps {
  open: boolean;
}

export function PageHeader({ open }: PageHeaderProps) {
  return (
    <div>
      <motion.div className="flex items-center justify-center p-2 gap-2 font-abc bg-zinc-900 mb-1 rounded-lg text-xl font-semibold">
        <picture className="h-full w-10 flex-none">
          <img
            src="https://avatars.githubusercontent.com/u/102503098?v=4"
            alt="Playlist Collector"
            className="object-cover w-full h-full rounded-full"
          />
        </picture>
        {open && (
          <motion.h1
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-md"
          >
            Playlist Collector
          </motion.h1>
        )}
      </motion.div>
    </div>
  );
}
