import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../../global";
import { SearchInput, SearchBackground } from "./";


export function SearchBar() {
  const navigate = useNavigate();
  const { search, setSearch } = useSearchStore((state: any) => state);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length !== 0) navigate(`/search/${search}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className="relative w-[60%] font-abc">
      <SearchInput
        search={search}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <SearchBackground />
    </div>
  );
}
