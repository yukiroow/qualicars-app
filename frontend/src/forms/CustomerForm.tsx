import type { FormEvent } from "react";
import type { CustomerProp } from "../props/PropInterfaces";
const CustomerForm = ({
    customerData,
    setStep,
    handleChange,
    errors,
    validateFields,
}: CustomerProp) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const proceedFlag = validateFields!();
        if (!proceedFlag) {
            return;
        }

        if (setStep) {
            setStep(2);
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="fieldset rounded-box p-4 w-full"
        >
            <label className="label">Customer Name</label>
            <input
                type="text"
                className={`input w-full ${errors?.nameErr === true ? "input-error" : ""}`}
                name="name"
                maxLength={30}
                value={customerData.name}
                onChange={handleChange}
                placeholder="Enter full name of Customer"
            />

            <label className="label">Address</label>
            <input
                type="input"
                className={`input w-full ${errors?.addressErr === true ? "input-error" : ""}`}
                name="address"
                maxLength={255}
                value={customerData.address}
                onChange={handleChange}
                placeholder="Enter address of Customer"
            />

            <label className="label">Contact Number</label>
            <input
                type="text"
                className={`input w-full ${errors?.contactErr === true ? "input-error" : ""}`}
                name="contact"
                maxLength={20}
                value={customerData.contact}
                onChange={handleChange}
                placeholder="Enter contact number of Customer"
            />
            <button type="submit" className="btn btn-primary mt-4">
                Next
            </button>
        </form>
    );
};

export default CustomerForm;
