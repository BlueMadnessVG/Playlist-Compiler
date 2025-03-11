export function Tooltip({ children, tooltip }: { children: any; tooltip: string }) {
  return (
    <div className=" group relative inline-block ">
      {children}
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all bg-zinc-800 text-sm font-abc text-white p-1 rounded-md absolute top-full mt-2 whitespace-nowrap left-1/2 -translate-x-1/2">
        {tooltip}
      </span>
    </div>
  );
}
