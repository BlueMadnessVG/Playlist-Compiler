import { PageHeader } from "../header";

interface PlaylistHeaderProps {
  showProfile: boolean;
}

export function PlaylistHeader({ showProfile }: PlaylistHeaderProps) {
  return (
    <header className="flex flex-col sticky top-0 px-6 pt-6 bg-gradient-to-t z-20">
      <PageHeader showProfile={showProfile} />
    </header>
  );
}
