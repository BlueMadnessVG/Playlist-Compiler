import { useYoutubeStore } from "../../global";
import {
  handleYoutubeLogin,
  handleYoutubeLogout,
} from "../../utils/controllers";
import { Tooltip } from "../../utils/Page utils";

interface ProfileSectionProps {
  showProfile: boolean;
}

export function ProfileSection({ showProfile }: ProfileSectionProps) {
  const { youtubeToken, youtubeProfileThumb } = useYoutubeStore(
    (state: any) => state
  );

  return (
    <div className="flex gap-2 mr-3 justify-end">
      {showProfile &&
        (!youtubeToken ? (
          <button
            className="rounded-xl flex items-center min-h-10 text-xs gap-2 px-2 border font-abc text-red-500 bg-zinc-700/80 border-red-500/50 hover:bg-zinc-700 hover:border-red-500"
            onClick={handleYoutubeLogin}
          >
            <img src="/Youtube.png" alt="YouTube" />
            YouTube
          </button>
        ) : (
          <Tooltip tooltip="Profile">
            <button
              className="flex group-hover:scale-110 transition group"
              onClick={handleYoutubeLogout}
            >
              <picture className="h-10 w-10 flex-none">
                <img
                  src={youtubeProfileThumb}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full border border-red-500 group-hover:brightness-50"
                />
              </picture>
            </button>

            <div className="absolute right-2 bottom-6 translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-4 text-red-500 pointer-events-none">
              <img src="/Youtube.png" alt="YouTube" />
            </div>
          </Tooltip>
        ))}
    </div>
  );
}
