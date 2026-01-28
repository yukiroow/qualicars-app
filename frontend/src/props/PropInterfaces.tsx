import type { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface FetchProps {
    endpoint: string;
    payload?: FormData;
}

export interface TransactionObject {
    agent: {
        fullName: string;
        username: string;
    };
    amount: number;
    customer: {
        customer_id: number;
        name: string;
    };
    date: Date;
    transaction_id: number;
    vehicle: {
        chassis_no: string;
        engine_no: string;
        make: string;
        year: string;
        color: string;
    };
}

export interface CustomerObject {
    customer_id?: number;
    address: string;
    contact: string;
    name: string;
}

export interface VehicleObject {
    vehicle_id?: number;
    available?: boolean;
    chassis_no: string;
    engine_no: string;
    color: string;
    make: string;
    year: string;
}

export interface RecentSalesObject {
    date: Date;
    vehicle: {
        make: string;
        year: string;
    };
}

export interface AgentObject {
    address: string;
    agent_id: number;
    contact: string;
    date_joined: Date;
    first_name: string;
    last_name: string;
    username: string;
}

export interface ApiResponse {
    responseData?: {
        transactions?: TransactionObject[];
        recentTransactions?: RecentSalesObject[];
        customers?: CustomerObject[];
        vehicles?: VehicleObject[];
        agent?: AgentObject;
    };
    status: number;
}

export interface PanelProp {
    username?: string;
    setInitState: Dispatch<
        SetStateAction<{
            recentSales: boolean;
            customers: boolean;
            vehicles: boolean;
            transactions: boolean;
        }>
    >;
}

export interface StateProps {
    username?: string;
    notification?: string;
    modalOpen?: {
        profile: boolean;
        transaction: boolean;
        vehicle: boolean;
        customer: boolean;
    };
    setUsername?: Dispatch<SetStateAction<string>>;
    setPage?: Dispatch<SetStateAction<number>>;
    setNotification?: Dispatch<SetStateAction<string>>;
    setToastType?: Dispatch<SetStateAction<number>>;
    setLoading?: Dispatch<SetStateAction<boolean>>;
    setModalOpen?: Dispatch<
        SetStateAction<{
            profile: boolean;
            transaction: boolean;
            vehicle: boolean;
            customer: boolean;
        }>
    >;
}

export interface VehicleProp {
    vehicleData: {
        make: string;
        year: string;
        color: string;
        engineNo: string;
        chassisNo: string;
    };
    setStep?: Dispatch<SetStateAction<number>>;
    handleSubmit?(): void;
    handleChange?(event: ChangeEvent<HTMLInputElement>): void;
    errors?: {
        makeErr: boolean;
        colorErr: boolean;
        yearErr: boolean;
        engineErr: boolean;
        chassisErr: boolean;
    };
    validateFields?(): boolean;
}

export interface TransactionProp {
    transactionData: {
        vehicleId: number;
        customerId: number;
        agentId: number;
        amount: number;
    };
    modalOpen?: {
        profile: boolean;
        transaction: boolean;
        vehicle: boolean;
        customer: boolean;
    };
    handleSubmit?(): void;
    setLoading?: Dispatch<SetStateAction<boolean>>;
    setNotification?: Dispatch<SetStateAction<string>>;
    setStep: Dispatch<SetStateAction<number>>;
    setTransactionData?: Dispatch<
        SetStateAction<{
            vehicleId: number;
            customerId: number;
            agentId: number;
            amount: number;
        }>
    >;
}

export interface CustomerProp {
    customerData: {
        name: string;
        address: string;
        contact: string;
    };
    setStep?: Dispatch<SetStateAction<number>>;
    handleSubmit?(): void;
    handleChange?(event: ChangeEvent<HTMLInputElement>): void;
    errors?: {
        nameErr: boolean;
        addressErr: boolean;
        contactErr: boolean;
    };
    validateFields?(): boolean;
}
