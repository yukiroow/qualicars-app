import { useEffect, useState, type FormEvent } from "react";
import type { CustomerObject, TransactionProp } from "../props/PropInterfaces";
import useApiFetch from "../hooks/useApiFetch";

const TransactionSelectVehicle = ({
    transactionData,
    setStep,
    setTransactionData,
    setNotification,
    setLoading,
}: TransactionProp) => {
    const { getRequest } = useApiFetch();
    const [customers, setCustomers] = useState<CustomerObject[]>([]);
    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading!(true);
            const response = await getRequest({
                endpoint: "/customers?withId=true",
            });
            if (response.status !== 200) {
                return;
            }
            if (!response.responseData) {
                return;
            }
            setCustomers(response.responseData.customers!);
            setLoading!(false);
        };
        fetchCustomers();

        return () => {
            setCustomers([]);
        };
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!transactionData.customerId) {
            setNotification!("Please select a Customer!");
            return;
        }

        if (setStep) {
            setStep(3);
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="fieldset rounded-box p-4  w-fit"
        >
            <div className="overflow-y-auto h-96">
                <table className="table table-pin-rows h-64">
                    <thead>
                        <tr>
                            <th colSpan={5} className="text-center text-xl">
                                Select Customer
                            </th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Contact No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr
                                onClick={() =>
                                    setTransactionData!((prev) => ({
                                        ...prev,
                                        customerId: customer.customer_id!,
                                    }))
                                }
                                className={`hover:bg-base-200 cursor-pointer ${transactionData.customerId === customer.customer_id ? "bg-base-300" : ""}`}
                                key={customer.customer_id}
                            >
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => setStep(1)}
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

export default TransactionSelectVehicle;
