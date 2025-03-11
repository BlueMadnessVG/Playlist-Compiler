import { ProfileButton } from ".";
import {
  handleYoutubeLogin,
  handleYoutubeLogout,
} from "../../utils/controllers";

interface HomeLoginButtonsProps {
  youtubeToken: boolean | undefined;
  youtubeProfileThumb: string;
}

export function HomeLoginButtons({
  youtubeToken,
  youtubeProfileThumb,
}: HomeLoginButtonsProps) {
  return (
    <section className="grid grid-cols-3 gap-8 mb-5 pt-4">
      <button
        onClick={!youtubeToken ? handleYoutubeLogin : handleYoutubeLogout}
      >
        <ProfileButton
          icon={"Youtube_Music_icon.png"}
          thumb={youtubeProfileThumb}
          style={"from-[#ff0000]/70 to-[#ff0000]/20"}
        >
          Youtube
        </ProfileButton>
      </button>

      <ProfileButton
        icon={"Spotify_icon.png"}
        thumb={youtubeProfileThumb}
        style={"from-[#3be477]/70 to-[#3be477]/20"}
      >
        Spotify
      </ProfileButton>
    </section>
  );
}
