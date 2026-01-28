import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Spinner = () => {
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        popoverRef.current?.showPopover();
    }, []);

    return createPortal(
        <div
            ref={popoverRef}
            popover="manual"
            className="fixed inset-0 m-0 h-full w-full flex items-center justify-center bg-base-300/50 border-none backdrop:bg-transparent"
        >
            <span className="loading loading-ring loading-xl"></span>
        </div>,
        document.body,
    );
};

export default Spinner;
