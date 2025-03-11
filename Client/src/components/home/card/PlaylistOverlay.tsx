import { useAnimate } from "framer-motion";
import { PlayButton } from "../../../utils/Page utils";
import { BOTTOM_RIGHT_CLIP } from "../../../utils/Motion";

interface PlaylistOverlayProps {
    playlistId: string;
    type: string;
}

export function PlaylistOverlay ( { playlistId, type }: PlaylistOverlayProps ) {
    const [scope] = useAnimate();

    return (
        <div
      ref={scope}
      style={{ clipPath: BOTTOM_RIGHT_CLIP }}
      className="absolute w-[96%] h-[71%] left-1 top-2 grid place-content-center bg-violet-900/85 text-white border-md z-10 rounded-lg"
    >
      <PlayButton
        id={playlistId}
        type={type}
        text=""
        style="card-play-button"
      />
    </div>
    )
}