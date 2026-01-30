import { useEffect, useState } from "react";
import useApiFetch from "../hooks/useApiFetch";
import type {
    ApiResponse,
    PanelProp,
    VehicleObject,
} from "../props/PropInterfaces";

const VehiclesPanel = ({ setInitState }: PanelProp) => {
    const [vehiclesData, setVehiclesData] = useState<VehicleObject[]>();
    const { getRequest } = useApiFetch();
    useEffect(() => {
        const fetchData = async () => {
            const response: ApiResponse = await getRequest({
                endpoint: "/vehicles?available=true",
            });
            if (response.status !== 200) {
                setInitState((prev) => ({
                    ...prev,
                    vehicles: false,
                }));
                return;
            }
            if (!response.responseData) {
                setInitState((prev) => ({
                    ...prev,
                    vehicles: false,
                }));
                return;
            }
            setVehiclesData(response.responseData.vehicles);
            setInitState((prev) => ({
                ...prev,
                vehicles: true,
            }));
        };

        fetchData();
    }, []);
    return (
        <div className="row-span-5 col-span-2 p-2">
            <div className="card w-full h-full  bg-base-100 p-2 pl-5">
                <div className="flex flex-row gap-2">
                    <h1 className="text-primary text-xl">Available vehicles</h1>
                    <button
                        className="btn btn-square p-1 size-6 tooltip tooltip-info ml-auto"
                        data-tip="View unavailable vehicles"
                    >
                        U
                    </button>
                    <button
                        className="btn btn-square p-1 size-6 tooltip tooltip-info"
                        data-tip="Filter view"
                    >
                        F
                    </button>
                    <button
                        className="btn btn-square p-1 size-6 tooltip tooltip-info"
                        data-tip="Sort"
                    >
                        S
                    </button>
                </div>
                <div className="overflow-y-auto h-full">
                    <table className="table table-pin-rows overflow-y-auto outline-none">
                        <thead>
                            <tr>
                                <th>Make</th>
                                <th>Year</th>
                                <th>Color</th>
                                <th>Engine No.</th>
                                <th>Chassis No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!vehiclesData ? (
                                <tr key={"01"}>
                                    <td
                                        colSpan={5}
                                        className="text-center text-gray-500 cursor-default select-none"
                                    >
                                        No Data
                                    </td>
                                </tr>
                            ) : (
                                vehiclesData!.map((vehicle) => (
                                    <tr key={vehicle.engine_no} className="hover:bg-base-300">
                                        <td>{vehicle.make}</td>
                                        <td>{vehicle.year}</td>
                                        <td>{vehicle.color}</td>
                                        <td>{vehicle.engine_no}</td>
                                        <td>{vehicle.chassis_no}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VehiclesPanel;
