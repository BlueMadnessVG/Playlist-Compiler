import { useNavigate } from "react-router-dom";

function SideMenuItem({ children, href }: { children: any; href: string }) {
  const navigate = useNavigate();
  return (
    <li>
      <a
        onClick={() => {
          navigate(`${href}`);
        }}
        className="flex gap-5 text-zinc-400 hover:text-zinc-100 items-end py-2 px-5 font-bold text-sm transition duration-300 font-abc cursor-pointer"
      >
        {children}
      </a>
    </li>
  );
}

export default SideMenuItem;
