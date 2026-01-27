import type { StateProps } from "../props/PropInterfaces";
import { PersonIcon, LogoutIcon } from "../assets/Icons";

const UserCard = ({ username }: StateProps) => {
    const showProfileModal = (): void => {
        const modal = document.getElementById(
            "profile_modal",
        )! as HTMLDialogElement;
        modal.showModal();
    };
    const showLogoutModal = (): void => {
        const modal = document.getElementById(
            "logout_modal",
        )! as HTMLDialogElement;
        modal.showModal();
    };

    return (
        <div className="row-span-1 col-span-1 p-2">
            <div className="card flex-row items-center w-full h-full gap-3 bg-base-100 p-2 ">
                <PersonIcon iconStyle="size-6 fill-primary" />
                <span
                    className="font-light select-none tooltip tooltip-info cursor-pointer"
                    data-tip="View profile"
                    onClick={showProfileModal}
                >
                    Hi,{" "}
                    <span className="hover:underline font-bold">
                        {username}
                    </span>
                </span>
                <button
                    className="btn btn-square p-1 size-6 tooltip tooltip-warning ml-auto"
                    data-tip="Logout"
                    onClick={showLogoutModal}
                >
                    <LogoutIcon iconStyle="size-6 fill-primary" />
                </button>
            </div>
        </div>
    );
};

export default UserCard;
