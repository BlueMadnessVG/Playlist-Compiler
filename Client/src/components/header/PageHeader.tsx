import { ProfileSection, SearchSection } from ".";

export function PageHeader({ showProfile }: { showProfile: boolean }) {
  return (
    <div className="relative grid grid-cols-5 justify-end z-40">
      <div />
      <SearchSection />
      <ProfileSection showProfile={showProfile} />
    </div>
  );
}
