import type { TransactionProp } from "../props/PropInterfaces";

const TransactionFormSummary = ({
    transactionData,
    setStep,
    handleSubmit,
}: TransactionProp) => {
    return (
        <>
            <div className="w-96">
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <td colSpan={2} className="text-center">
                                Transaction Details
                            </td>
                        </tr>
                        <tr>
                            <td>Vehicle ID</td>
                            <td className="text-primary font-normal">
                                {transactionData.vehicleId}
                            </td>
                        </tr>
                        <tr>
                            <td>Customer ID</td>
                            <td className="text-primary font-normal">
                                {transactionData.customerId}
                            </td>
                        </tr>
                        <tr>
                            <td>Amount</td>
                            <td className="text-primary font-normal">
                                PHP {transactionData.amount}
                            </td>
                        </tr>
                    </thead>
                </table>
                <div className="flex flex-row gap-2 justify-end">
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={() => {
                            setStep!(3);
                        }}
                    >
                        Back
                    </button>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default TransactionFormSummary;
