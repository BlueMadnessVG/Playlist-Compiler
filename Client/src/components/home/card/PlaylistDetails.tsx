interface PlaylistDetailsProps {
  title: string;
  type: string;
}

export function PlaylistDetails({ title, type }: PlaylistDetailsProps) {
  return (
    <div className="flex flex-auto flex-col font-abc px-3">
      <h4 className="text-md truncate">{title}</h4>
      <span className="text-xs text-gray-500 pt-1">{type}</span>
    </div>
  );
}
