import { PageHeader } from "../header";

interface SearchHeaderProps {
  showProfile: boolean;
}

export function SearchHeader({ showProfile }: SearchHeaderProps) {
  return (
    <div className="z-10 px-6 pt-2">
      <PageHeader showProfile={showProfile} />
    </div>
  );
}
