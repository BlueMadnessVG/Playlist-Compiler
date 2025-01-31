function SearchResult({ children, title }: { children: any; title: string }) {
  return (
    <div className="mt-4 bg-zinc-950/40 drop-shadow-xl shadow-inner shadow-zinc-900/90 pb-2">
      <div className="pt-4 pl-4">
        <h2 className="text-xl"> {title} </h2>
      </div>
      {children}
    </div>
  );
}
export default SearchResult;
