import { ReactElement } from "react";

interface ComponentProps {
  children: ReactElement;
  dismiss?: () => void;
  extraClass?: string;
}

const Dialog = ({ children, dismiss, extraClass }: ComponentProps) => {
  return (
    <div className={`absolute left-0 right-0 bottom-0 top-0 grid grid-cols-[1fr_minmax(0,_560px)_1fr] ${extraClass ? extraClass : ''}`}>
      <div
        onClick={dismiss}
        id="backdrop"
        className="backdrop-blur-sm absolute left-0 right-0 top-0 bottom-0"
      />
      <div />
      <div className="relative z-[21] h-full">{children}</div>
      <div />
    </div>
  );
};

export default Dialog;
