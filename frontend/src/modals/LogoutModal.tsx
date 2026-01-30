import type { StateProps } from "../props/PropInterfaces";

const LogoutModal = ({
    handleLogout,
    setNotification,
    setToastType,
}: StateProps) => {
    const onConfirm = async () => {
        setToastType!(1);
        handleLogout!();
        setNotification!("Logout Succcess");
    };

    return (
        <dialog id="logout_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Logout</h3>
                <p className="py-4">You are about to logout.</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button
                            className="btn btn-error mr-2"
                            onClick={onConfirm}
                        >
                            Confirm
                        </button>
                        <button className="btn">Cancel</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default LogoutModal;
