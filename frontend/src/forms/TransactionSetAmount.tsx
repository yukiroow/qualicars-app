import type { FormEvent } from "react";
import type { TransactionProp } from "../props/PropInterfaces";

const TransactionSelectAmount = ({
    transactionData,
    setStep,
    setTransactionData,
    setNotification,
}: TransactionProp) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!transactionData.amount) {
            setNotification!("Please enter a valid amount");
            return;
        }

        if (setStep) {
            setStep(4);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="fieldset rounded-box p-4 w-80">
            <label className="label">Amount</label>
            <input
                type="number"
                className={`input w-full`}
                name="amount"
                maxLength={20}
                value={transactionData.amount}
                onChange={(event) => {
                    setTransactionData!((prev) => ({
                        ...prev,
                        amount: Number(event.target.value),
                    }));
                }}
                placeholder="Enter Price of Vehicle"
            />
            <div className="flex gap-2">
                <button
                    onClick={() => setStep(2)}
                    type="button"
                    className="btn btn-primary btn-outline mt-4 flex-1"
                >
                    Back
                </button>
                <button type="submit" className="btn btn-primary mt-4 flex-1">
                    Next
                </button>
            </div>
        </form>
    );
};

export default TransactionSelectAmount;
