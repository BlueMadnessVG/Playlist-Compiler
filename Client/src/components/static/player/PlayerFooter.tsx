import { useNavigate } from "react-router-dom";
import { ParallaxText } from "../../../utils/Motion/";
import { VolumeController } from ".";
import { memo } from "react";

interface PlayerFooterProps {
  songTitle: string;
  artistName: string;
  artistId: string;
  playlistType: string;
}

export const PlayerFooter = memo(
  ({ songTitle, artistName, artistId, playlistType }: PlayerFooterProps) => {
    const navigate = useNavigate();

    return (
      <div className="flex flex-auto flex-col justify-between w-full px-4 z-50 pb-2 pt-2 bg-zinc-800 font-abc cursor-default overflow-hidden">
        <div className={`whitespace-nowrap inline-block truncate`}>
          {songTitle.length < 20 ? (
            <h2 className="text-lg">{songTitle}</h2>
          ) : (
            <ParallaxText>{songTitle}</ParallaxText>
          )}
        </div>

        <div className="flex items-end justify-between">
          <a
            onClick={() => navigate(`/artist/${playlistType}/${artistId}`)}
            className="text-sm font-thin text-gray-400 border-0 hover:text-gray-300 cursor-pointer"
          >
            {artistName}
          </a>

          <VolumeController />
        </div>
      </div>
    );
  }
);
