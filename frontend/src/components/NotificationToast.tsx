import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { createPortal } from "react-dom";

// 0 - Error, 1 - Success
interface ToastProps {
    message: string;
    type: number;
    setNotification: Dispatch<SetStateAction<string>>;
}

const NotificationToast = ({ message, type, setNotification }: ToastProps) => {
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        popoverRef.current?.showPopover();

        const timer = setTimeout(() => {
            setNotification("");
        }, 2000);

        return () => clearTimeout(timer);
    }, [setNotification]);

    const toastContent = (
        <div
            ref={popoverRef}
            popover="manual"
            className="fixed top-5 left-1/2 -translate-x-1/2 m-0 p-0 border-none bg-transparent overflow-visible"
        >
            <div className="toast toast-top toast-center relative">
                <div
                    className={`alert ${type === 0 ? "alert-error" : "alert-success"} shadow-lg text-white`}
                >
                    <span>{message}</span>
                </div>
            </div>
        </div>
    );

    return createPortal(toastContent, document.body);
};

export default NotificationToast;
