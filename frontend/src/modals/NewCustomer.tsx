import { useState } from "react";
import type { ChangeEvent } from "react";
import CustomerFormSummary from "../components/CustomerFormSummary";
import CustomerForm from "../forms/CustomerForm";
import type { ApiResponse, StateProps } from "../props/PropInterfaces";
import useApiFetch from "../hooks/useApiFetch";

const NewCustomer = ({
    setNotification,
    setLoading,
    setToastType,
}: StateProps) => {
    const [step, setStep] = useState(1);
    const [customerData, setCustomerData] = useState({
        name: "",
        address: "",
        contact: "",
    });
    const [errors, setErrors] = useState({
        nameErr: false,
        addressErr: false,
        contactErr: false,
    });
    const { postRequest } = useApiFetch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateFields = (): boolean => {
        const newErrors = {
            nameErr: !customerData.name,
            addressErr: !customerData.address,
            contactErr: !customerData.contact,
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((val) => val === true);

        if (hasErrors) {
            setToastType!(0);
            setNotification!("Please complete the form properly!");
            return false;
        }

        return true;
    };

    const handleSubmit = async (): Promise<void> => {
        setLoading!(true);
        const modal = document.getElementById(
            "customer_modal",
        ) as HTMLDialogElement;

        const formData = new FormData();
        formData.append("name", customerData.name);
        formData.append("address", customerData.address);
        formData.append("contact", customerData.contact);

        const response: ApiResponse = await postRequest({
            endpoint: "/customers",
            payload: formData,
        });
        switch (response.status) {
            case 201:
                setToastType!(1);
                setNotification!("Customer Adding Success");
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
        setLoading!(false);
    };

    return (
        <dialog id="customer_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">Add new Customer</h3>

                {step === 1 ? (
                    <CustomerForm
                        errors={errors}
                        customerData={customerData}
                        setStep={setStep}
                        handleChange={handleChange}
                        validateFields={validateFields}
                    />
                ) : (
                    <CustomerFormSummary
                        customerData={customerData}
                        handleSubmit={handleSubmit}
                        setStep={setStep}
                    />
                )}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default NewCustomer;
