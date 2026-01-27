const CreationButtons = () => {
    const showCustomerForm = (): void => {
        const modal = document.getElementById(
            "customer_modal",
        )! as HTMLDialogElement;
        modal.showModal();
    };
    const showVehicleForm = (): void => {
        const modal = document.getElementById(
            "vehicle_modal",
        )! as HTMLDialogElement;
        modal.showModal();
    };
    const showTransactionForm = (): void => {
        const modal = document.getElementById(
            "transaction_modal",
        )! as HTMLDialogElement;
        modal.showModal();
    };
    return (
        <div className="flex flex-col row-span-3 col-span-1 p-2">
            <div className="card w-full h-full bg-base-100 p-5 gap-5">
                <button
                    className="btn btn-outline btn-primary flex-1 p-2"
                    onClick={showCustomerForm}
                >
                    Enroll customer
                </button>
                <button
                    className="btn btn-outline btn-primary flex-1 p-2"
                    onClick={showVehicleForm}
                >
                    Add vehicle
                </button>
            </div>
        </div>
    );
};

export default CreationButtons;
