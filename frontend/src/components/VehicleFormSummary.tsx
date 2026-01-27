import type { VehicleProp } from "../props/PropInterfaces";

const VehicleFormSummary = ({
    vehicleData,
    setStep,
    handleSubmit,
}: VehicleProp) => {
    return (
        <>
            <div>
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <td colSpan={2} className="text-center">
                                Vehicle Details
                            </td>
                        </tr>
                        <tr>
                            <td>Make</td>
                            <td className="text-primary font-normal">
                                {vehicleData.make}
                            </td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td className="text-primary font-normal">
                                {vehicleData.year}
                            </td>
                        </tr>
                        <tr>
                            <td>Color</td>
                            <td className="text-primary font-normal">
                                {vehicleData.color}
                            </td>
                        </tr>
                        <tr>
                            <td>Engine No.</td>
                            <td className="text-primary font-normal">
                                {vehicleData.engineNo}
                            </td>
                        </tr>
                        <tr>
                            <td>Chassis No.</td>
                            <td className="text-primary font-normal">
                                {vehicleData.chassisNo}
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

export default VehicleFormSummary;
