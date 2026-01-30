import { useState } from "react";
import VehicleFormSummary from "../components/VehicleFormSummary";
import type { ApiResponse, StateProps } from "../props/PropInterfaces";
import VehicleForm from "../forms/VehicleForm";
import useApiFetch from "../hooks/useApiFetch";
import { handleChangeInput } from "../util/utils";

const NewVehicle = ({
    setNotification,
    setLoading,
    setToastType,
    setModalOpen,
}: StateProps) => {
    const [step, setStep] = useState(1);
    const [vehicleData, setVehicleData] = useState({
        make: "",
        year: "",
        color: "",
        engineNo: "",
        chassisNo: "",
    });
    const { postRequest } = useApiFetch();
    const [errors, setErrors] = useState({
        makeErr: false,
        colorErr: false,
        yearErr: false,
        engineErr: false,
        chassisErr: false,
    });

    const validateFields = (): boolean => {
        const currYear = new Date().getFullYear();
        const fieldYear = Number(vehicleData.year);
        const newErrors = {
            makeErr: !vehicleData.make.trim(),
            colorErr: !vehicleData.color.trim(),
            yearErr:
                !vehicleData.year || (fieldYear > currYear && fieldYear < 2008),
            engineErr: !vehicleData.engineNo,
            chassisErr: !vehicleData.chassisNo,
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
            "vehicle_modal",
        ) as HTMLDialogElement;

        const formData = new FormData();
        formData.append("make", vehicleData.make);
        formData.append("year", vehicleData.year);
        formData.append("color", vehicleData.color);
        formData.append("engine_no", vehicleData.engineNo);
        formData.append("chassis_no", vehicleData.chassisNo);

        const response: ApiResponse = await postRequest({
            endpoint: "/vehicles",
            payload: formData,
        });
        switch (response.status) {
            case 201:
                setToastType!(1);
                setNotification!("Vehicle Adding Success");
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
        <dialog id="vehicle_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button
                        onClick={() => {
                            setModalOpen!((prev) => ({
                                ...prev,
                                vehicle: false,
                            }));
                            setVehicleData({
                                make: "",
                                year: "",
                                color: "",
                                engineNo: "",
                                chassisNo: "",
                            });
                        }}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">Add new Vehicle</h3>

                {step === 1 ? (
                    <VehicleForm
                        errors={errors}
                        vehicleData={vehicleData}
                        setStep={setStep}
                        handleChange={(event) =>
                            handleChangeInput(event, undefined, setVehicleData)
                        }
                        validateFields={validateFields}
                    />
                ) : (
                    <VehicleFormSummary
                        vehicleData={vehicleData}
                        handleSubmit={handleSubmit}
                        setStep={setStep}
                    />
                )}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button
                    onClick={() => {
                        setModalOpen!((prev) => ({
                            ...prev,
                            transaction: false,
                        }));
                        setVehicleData({
                            make: "",
                            year: "",
                            color: "",
                            engineNo: "",
                            chassisNo: "",
                        });
                    }}
                >
                    close
                </button>
            </form>
        </dialog>
    );
};

export default NewVehicle;
