import { CloseAside } from ".";
import { ArrowLeftIcon } from "../../../assets/icons";

interface PageFooterProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function PageFooter({ open, setOpen }: PageFooterProps) {
  return <CloseAside open={open} setOpen={setOpen} Icon={ArrowLeftIcon} />;
}
