import { useEffect, useState, type FormEvent } from "react";
import type { TransactionProp, VehicleObject } from "../props/PropInterfaces";
import useApiFetch from "../hooks/useApiFetch";

const TransactionSelectVehicle = ({
    transactionData,
    setStep,
    setTransactionData,
    setNotification,
    setLoading,
    modalOpen,
}: TransactionProp) => {
    const { getRequest } = useApiFetch();
    const [availableVehicles, setAvailableVehicles] = useState<VehicleObject[]>(
        [],
    );

    useEffect(() => {
        const fetchAvailableVehicles = async () => {
            setLoading!(true);
            const response = await getRequest({
                endpoint: "/vehicles?available=true&page=0&size=0",
            });
            if (response.status !== 200) {
                return;
            }
            if (!response.responseData) {
                return;
            }
            setAvailableVehicles(response.responseData.vehicles!);
            setLoading!(false);
        };
        fetchAvailableVehicles();

        return () => {
            setAvailableVehicles([]);
        };
    }, [modalOpen]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!transactionData.vehicleId) {
            setNotification!("Please select a vehicle first!");
            return;
        }

        if (setStep) {
            setStep(2);
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="fieldset rounded-box p-4 w-fit"
        >
            <div className="overflow-y-auto h-96">
                <table className="table table-pin-rows h-64">
                    <thead>
                        <tr>
                            <th colSpan={5} className="text-center text-xl">
                                Select Vehicle
                            </th>
                        </tr>
                        <tr>
                            <th>Year</th>
                            <th>Make</th>
                            <th>Color</th>
                            <th>Engine No.</th>
                            <th>Chassis No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableVehicles.map((vehicle) => (
                            <tr
                                onClick={() =>
                                    setTransactionData!((prev) => ({
                                        ...prev,
                                        vehicleId: vehicle.vehicle_id!,
                                    }))
                                }
                                className={`hover:bg-base-200 cursor-pointer ${transactionData.vehicleId === vehicle.vehicle_id ? "bg-base-300" : ""}`}
                                key={vehicle.vehicle_id}
                            >
                                <td>{vehicle.year}</td>
                                <td>{vehicle.make}</td>
                                <td>{vehicle.color}</td>
                                <td>{vehicle.engine_no}</td>
                                <td>{vehicle.chassis_no}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button type="submit" className="btn btn-primary mt-4">
                Next
            </button>
        </form>
    );
};

export default TransactionSelectVehicle;
