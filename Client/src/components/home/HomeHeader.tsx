import { PageHeader } from "../header";

interface HomeHeaderProps {
  showProfile: boolean;
}

export function HomeHeader({ showProfile }: HomeHeaderProps) {
  return (
    <div className="relative z-10 px-6 pt-2">
      <PageHeader showProfile={showProfile} />
    </div>
  );
}
