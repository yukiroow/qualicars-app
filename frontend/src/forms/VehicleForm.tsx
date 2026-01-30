import type { FormEvent } from "react";
import type { VehicleProp } from "../props/PropInterfaces";
import { handleBlur } from "../util/utils";
const VehicleForm = ({
    vehicleData,
    setStep,
    handleChange,
    errors,
    validateFields,
}: VehicleProp) => {
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
            <label className="label">Make</label>
            <input
                type="text"
                className={`input w-full ${errors?.makeErr === true ? "input-error" : ""}`}
                name="make"
                maxLength={20}
                value={vehicleData.make}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ex. Vaios GT"
            />

            <label className="label">Year</label>
            <input
                type="text"
                className={`input w-full ${errors?.yearErr === true ? "input-error" : ""}`}
                name="year"
                maxLength={4}
                value={vehicleData.year}
                onChange={handleChange}
                placeholder={`Ex. 2025 (2008 to ${new Date().getFullYear()})`}
            />

            <label className="label">Color</label>
            <input
                type="text"
                className={`input w-full ${errors?.colorErr === true ? "input-error" : ""}`}
                name="color"
                maxLength={20}
                value={vehicleData.color}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ex. Jade Green"
            />
            <label className="label">Engine Number</label>
            <input
                type="text"
                className={`input w-full ${errors?.engineErr === true ? "input-error" : ""}`}
                name="engineNo"
                maxLength={25}
                value={vehicleData.engineNo}
                onChange={handleChange}
                placeholder="Ex. 4SFE0169266"
            />
            <label className="label">Chassis No</label>
            <input
                type="text"
                className={`input w-full ${errors?.chassisErr === true ? "input-error" : ""}`}
                name="chassisNo"
                maxLength={25}
                value={vehicleData.chassisNo}
                onChange={handleChange}
                placeholder="Ex. 1HGCM82633A123456"
            />
            <button type="submit" className="btn btn-primary mt-4">
                Next
            </button>
        </form>
    );
};

export default VehicleForm;
