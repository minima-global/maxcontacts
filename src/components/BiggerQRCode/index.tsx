import { createPortal } from "react-dom";
import QRCode from "react-qr-code";
import Dialog from "../Dialog";
import { useSpring, animated, config } from "react-spring";

interface QrProps {
    active: boolean;
    dismiss: () => void;
    data: string;
  }
  const BiggerQrCode = ({ data, active, dismiss }: QrProps) => {

    const springProps = useSpring({
      opacity: active ? 1 : 0,
      transform: active
        ? "translateY(0%) scale(1)"
        : "translateY(-50%) scale(0.8)",
      config: config.wobbly,
    });
    if (!active) {
      return null;
    }
  
    return (
      <>
        {active &&
          createPortal(
            <Dialog extraClass="z-[26]" dismiss={dismiss}>
              <div className="h-full grid items-start">
                <animated.div style={springProps}>
                  <div className=" shadow-violet-300 mt-[80px] w-[calc(100%_-_16px)] md:w-full pb-8 pt-4 px-4 rounded-lg mx-auto">
                    <div className=" flex justify-center items-center mx-auto gap-4 flex-col max-w-xs">
                      <QRCode size={300} value={data} />
                      <div className="w-full px-2">

                      <button
                        onClick={dismiss}
                        className="rounded-lg w-full bg-black text-white dark:bg-white dark:text-black hover:bg-opacity-80 shadow-lg font-bold py-4"
                      >
                        Dismiss
                      </button>
                      </div>
                    </div>
                  </div>
                </animated.div>
              </div>
            </Dialog>,
            document.body
          )}
      </>
    );
  };

  export default BiggerQrCode;