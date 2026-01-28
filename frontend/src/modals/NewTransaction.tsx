import { useEffect, useState } from "react";
import TransactionFormSummary from "../components/TransactionFormSummary";
import type { ApiResponse, StateProps } from "../props/PropInterfaces";
import TransactionSelectVehicle from "../forms/TransactionSelectVehicle.tsx";
import useApiFetch from "../hooks/useApiFetch";
import TransactionSelectCustomer from "../forms/TransactionSelectCustomer.tsx";
import TransactionSetAmount from "../forms/TransactionSetAmount.tsx";

const NewTransaction = ({
    setNotification,
    setLoading,
    setToastType,
    setModalOpen,
    modalOpen,
    username,
}: StateProps) => {
    const [step, setStep] = useState(1);
    const [transactionData, setTransactionData] = useState({
        vehicleId: 0,
        customerId: 0,
        agentId: 0,
        amount: 0,
    });
    const { postRequest, getRequest } = useApiFetch();

    const handleSubmit = async (): Promise<void> => {
        setLoading!(true);
        const modal = document.getElementById(
            "transaction_modal",
        ) as HTMLDialogElement;

        const formData = new FormData();
        formData.append("vehicle_id", transactionData.vehicleId.toString());
        formData.append("customer_id", transactionData.customerId.toString());
        formData.append("agent_id", transactionData.agentId.toString());
        formData.append("amount", transactionData.amount.toString());

        const response: ApiResponse = await postRequest({
            endpoint: "/transactions",
            payload: formData,
        });
        switch (response.status) {
            case 201:
                setToastType!(1);
                setNotification!("Transaction Recording Success");
                modal.close();
                break;
            case 409:
                setToastType!(0);
                setNotification!(
                    "There was a problem with your input. Please  try again.",
                );
                break;
            case 500:
                setToastType!(0);
                setNotification!(
                    "There is a problem with our server. Please try again later.",
                );
                break;
            default:
                setNotification!("Please check your network connection.");
        }
        setTransactionData({
            vehicleId: 0,
            customerId: 0,
            agentId: 0,
            amount: 0,
        });
        setLoading!(false);
    };

    useEffect(() => {
        const fetchAgentId = async () => {
            setLoading!(true);
            const response = await getRequest({
                endpoint: `/agents/${username}`,
            });
            if (response.status !== 200) {
                return;
            }
            if (!response.responseData) {
                return;
            }
            setTransactionData((prev) => ({
                ...prev,
                agentId: response.responseData!.agent!.agent_id,
            }));
            setLoading!(false);
        };
        fetchAgentId();
    }, [modalOpen]);

    return (
        <dialog id="transaction_modal" className="modal">
            <div className="modal-box max-w-fit">
                <form method="dialog">
                    <button
                        onClick={() => {
                            setModalOpen!((prev) => ({
                                ...prev,
                                transaction: false,
                            }));
                            setTransactionData({
                                vehicleId: 0,
                                customerId: 0,
                                agentId: 0,
                                amount: 0,
                            });
                            setStep(1);
                        }}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">Record transaction</h3>

                {modalOpen &&
                    (step === 1 ? (
                        <TransactionSelectVehicle
                            transactionData={transactionData}
                            setStep={setStep}
                            setTransactionData={setTransactionData}
                            setNotification={setNotification}
                            setLoading={setLoading}
                            modalOpen={modalOpen}
                        />
                    ) : step === 2 ? (
                        <TransactionSelectCustomer
                            transactionData={transactionData}
                            setStep={setStep}
                            setTransactionData={setTransactionData}
                            setNotification={setNotification}
                            setLoading={setLoading}
                        />
                    ) : step === 3 ? (
                        <TransactionSetAmount
                            transactionData={transactionData}
                            setStep={setStep}
                            setTransactionData={setTransactionData}
                            setNotification={setNotification}
                            setLoading={setLoading}
                        />
                    ) : (
                        <TransactionFormSummary
                            transactionData={transactionData}
                            handleSubmit={handleSubmit}
                            setStep={setStep}
                        />
                    ))}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button
                    onClick={() =>
                        setModalOpen!((prev) => ({
                            ...prev,
                            transaction: false,
                        }))
                    }
                >
                    close
                </button>
            </form>
        </dialog>
    );
};

export default NewTransaction;
