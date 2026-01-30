import type { ChangeEvent, Dispatch, SetStateAction } from "react";

export const currencyConverter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
});

export const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement>,
    setCustomerData?: Dispatch<
        SetStateAction<{
            name: string;
            address: string;
            contact: string;
        }>
    >,
    setVehicleData?: Dispatch<
        SetStateAction<{
            make: string;
            year: string;
            color: string;
            engineNo: string;
            chassisNo: string;
        }>
    >,
): void => {
    const { name, value } = event.target;
    let cleanedValue = value;

    const config: Record<
        string,
        {
            limit: number;
            noSpace?: boolean;
            numeric?: boolean;
            cleanSpaces?: boolean;
        }
    > = {
        name: { limit: 30, cleanSpaces: true },
        address: { limit: 255, cleanSpaces: true },
        contact: { limit: 11, numeric: true, noSpace: true },
        make: { limit: 20, cleanSpaces: true },
        year: { limit: 4, numeric: true, noSpace: true },
        color: { limit: 30, cleanSpaces: true },
        engineNo: { limit: 25, noSpace: true },
        chassisNo: { limit: 25, noSpace: true },
    };

    const rules = config[name];
    if (rules) {
        if (rules.noSpace) cleanedValue = cleanedValue.replace(/\s/g, "");

        if (rules.numeric) cleanedValue = cleanedValue.replace(/\D/g, "");

        if (rules.cleanSpaces) {
            cleanedValue = cleanedValue.replace(/\s+/g, " ");
        }

        cleanedValue = cleanedValue.slice(0, rules.limit);
    }

    if (setCustomerData) {
        setCustomerData((prev) => ({ ...prev, [name]: cleanedValue }));
        return;
    }
    if (setVehicleData) {
        setVehicleData((prev) => ({ ...prev, [name]: cleanedValue }));
        return;
    }
};

export const handleBlur = (
    event: ChangeEvent<HTMLInputElement>,
    setCustomerData?: Dispatch<
        SetStateAction<{
            name: "";
            address: "";
            contact: "";
        }>
    >,
    setVehicleData?: Dispatch<
        SetStateAction<{
            make: "";
            year: "";
            color: "";
            engineNo: "";
            chassisNo: "";
        }>
    >,
): void => {
    const { name, value } = event.target;

    const fieldsToTrim = ["name", "address", "make", "color"];

    if (fieldsToTrim.includes(name)) {
        const trimmedValue = value.trim();

        if (setCustomerData) {
            setCustomerData((prev) => ({ ...prev, [name]: trimmedValue }));
            return;
        }
        if (setVehicleData) {
            setVehicleData((prev) => ({ ...prev, [name]: trimmedValue }));
            return;
        }
    }
};
