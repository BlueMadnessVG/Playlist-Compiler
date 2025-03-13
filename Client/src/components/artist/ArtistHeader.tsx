import { ArtistInfoModel } from "../../models";
import { PageHeader } from "../header";

interface ArtistHeaderProps {
  artistInfo: ArtistInfoModel;
}

export function ArtistHeader({ artistInfo }: ArtistHeaderProps) {
  return (
    <header
      className="flex flex-col top-0 px-4 pt-6 pb-6 justify-between h-96"
      style={{
        backgroundImage: `${artistInfo.thumbnails.high}`,
      }}
    >
      <PageHeader showProfile={true} />
      <h1 className="z-10 text-7xl bg-gradient-to-r from-white from-10% via-indigo-600 via-90% to-violet-800 to-30% inline-block text-transparent bg-clip-text">
        {artistInfo.title.split("-")[0]}
      </h1>
    </header>
  );
}
