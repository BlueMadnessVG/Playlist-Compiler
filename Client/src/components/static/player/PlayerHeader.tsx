import { ArrowUpIcon, CloseIcon } from "../../../assets/icons";
import { memo, ReactNode } from "react";

interface PlayerHeaderProps {
  children: ReactNode;
  onClose: () => void;
  onToggleOpen: () => void;
  open: boolean;
  playedTime: string;
  maxTime: string;
}

export const PlayerHeader = memo(
  ({
    children,
    onClose,
    onToggleOpen,
    open,
    playedTime,
    maxTime,
  }: PlayerHeaderProps) => {

    return (
      <div className="group cursor-default">
        <div className="flex gap-5 place-content-center absolute bg-zinc-900/50 w-full h-[16vw] items-center opacity-0 group-hover:opacity-100 transition duration-300">
          {children}

          <div className="absolute gap-x-1 text-xs font-abc bottom-2 left-2">
            <span>{playedTime}</span>
            <span>/</span>
            <span>{maxTime}</span>
          </div>

          <div className="absolute gap-x-2 p-1 px-2 top-0 left-0 bg-zinc-800 rounded-br-lg hover:bg-zinc-700 transition-all duration-200">
            <button
              className={`hover:scale-110 ${open && "rotate-180"}`}
              onClick={onToggleOpen}
            >
              <ArrowUpIcon />
            </button>
          </div>

          <div className="absolute gap-x-1 top-2 right-2">
            <button className="hover:scale-110" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }
);
