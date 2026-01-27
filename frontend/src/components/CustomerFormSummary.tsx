import type { CustomerProp } from "../props/PropInterfaces";

const CustomerFormSummary = ({
    customerData,
    setStep,
    handleSubmit,
}: CustomerProp) => {
    return (
        <>
            <table className="table mt-2">
                <thead>
                    <tr>
                        <td colSpan={2} className="text-center">
                            Customer Details
                        </td>
                    </tr>
                    <tr>
                        <td>Full Name</td>
                        <td className="text-primary font-normal">
                            {customerData.name}
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td
                            className="text-primary font-normal break-all text-wrap"
                        >
                            {customerData.address}
                        </td>
                    </tr>
                    <tr>
                        <td>Contact Number</td>
                        <td className="text-primary font-normal">
                            {customerData.contact}
                        </td>
                    </tr>
                </thead>
            </table>
            <div className="flex flex-row gap-2 justify-end">
                <button
                    className="btn btn-secondary mt-2"
                    onClick={() => {
                        setStep!(1);
                    }}
                >
                    Back
                </button>
                <button className="btn btn-primary mt-2" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </>
    );
};

export default CustomerFormSummary;
