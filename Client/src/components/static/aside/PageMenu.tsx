import { SideMenuCard, SideMenuItem } from ".";
import { HomeIcon } from "../../../assets/icons";

interface PageMenuProps {
  open: boolean;
  history: any[];
  artistHistory: any[];
}

export function PageMenu({ open, history, artistHistory }: PageMenuProps) {
  return (
    <div className="overflow-y-auto bg-zinc-900 rounded-t-lg">
      <div className="flex flex-col p-2">
        <ul>
          <SideMenuItem href="/" open={open} Icon={HomeIcon} title="Home" />
        </ul>
      </div>
      <div className="relative flex px-4 items-center bg-zinc-900">
        <div className="flex-grow border-t border-zinc-400"></div>
      </div>
      <div className="bg-zinc-900 rounded-b-lg p-2 flex-1">
        <ul>
          <div className="flex flex-col pt-2 gap-2">
            {history.map((item, index) => (
              <SideMenuCard
                key={index}
                item={item}
                type="playlist"
                open={open}
              />
            ))}
            {artistHistory.map((item, index) => (
              <SideMenuCard key={index} item={item} type="artist" open={open} />
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}
