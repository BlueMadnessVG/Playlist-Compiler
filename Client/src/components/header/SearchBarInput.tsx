import { SearchIcon } from "../../assets/icons";

interface SearchBarProps {
  search: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SearchInput({
  search,
  onInputChange,
  onSubmit,
}: SearchBarProps) {
  return (
    <form
      className="flex justify-center items-center relative bg-zinc-950 border border-zinc-800 z-10 rounded-md group"
      onSubmit={onSubmit}
    >
      <SearchIcon style="ml-3 text-zinc-300 group-focus-within:text-white" />
      <input
        name="searchBar"
        value={search}
        placeholder="Enter an artist, playlist or song"
        className="relative bg-zinc-950 px-3 py-2 w-full focus:outline-none rounded-md"
        onChange={onInputChange}
      />
    </form>
  );
}
