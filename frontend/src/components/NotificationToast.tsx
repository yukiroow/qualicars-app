import { useEffect, type Dispatch, type SetStateAction } from "react";

// 0 - Error, 1 - Success
interface ToastProps {
    message: string;
    type: number;
    setNotification: Dispatch<SetStateAction<string>>;
}

const NotificationToast = ({ message, type, setNotification }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setNotification("");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <div className="toast toast-top toast-center z-1000">
                <div
                    className={`alert ${type === 0 ? "alert-error" : "alert-success"} z-1000`}
                >
                    <span>{message}</span>
                </div>
            </div>
        </>
    );
};

export default NotificationToast;
