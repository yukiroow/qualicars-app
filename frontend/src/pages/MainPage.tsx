import type { StateProps } from "../props/PropInterfaces";
import CreationButtons from "../components/CreationButtons";
import UserCard from "../components/UserCard";
import RecentSalesPanel from "../components/RecentSalesPanel";
import CustomersPanel from "../components/CustomersPanel";
import TransactionsPanel from "../components/TransactionsPanel";
import VehiclesPanel from "../components/VehiclesPanel";
import LogoutModal from "../modals/LogoutModal";
import NotificationToast from "../components/NotificationToast";
import { useEffect, useState } from "react";
import ProfileModal from "../modals/ProfileModal";
import Spinner from "../components/Spinner";
import NewVehicle from "../modals/NewVehicle";
import NewCustomer from "../modals/NewCustomer";

const MainPage = ({
    username,
    notification,
    setUsername,
    setPage,
    setNotification,
}: StateProps) => {
    const [toastType, setToastType] = useState(0);
    const [loading, setLoading] = useState(false);
    const [initState, setInitState] = useState({
        recentSales: false,
        customers: false,
        vehicles: false,
        transactions: false,
    });
    const initLoading =
        !initState.recentSales ||
        !initState.customers ||
        !initState.vehicles ||
        !initState.transactions;

    useEffect(() => {
        if (!username) {
            if (setPage) setPage(0);
        }
    }, [setPage, username]);

    return (
        <>
            {(initLoading || loading) && <Spinner />}
            {notification && setNotification && (
                <NotificationToast
                    message={notification}
                    type={toastType}
                    setNotification={setNotification}
                />
            )}
            <main className="bg-base-300 grid grid-flow-col grid-cols-5 grid-rows-10 h-screen p-8">
                <RecentSalesPanel
                    username={username}
                    setInitState={setInitState}
                />
                <CreationButtons />
                <UserCard username={username} />
                <CustomersPanel setInitState={setInitState} />
                <VehiclesPanel setInitState={setInitState} />
                <TransactionsPanel setInitState={setInitState} />
                <NewCustomer
                    setNotification={setNotification}
                    setLoading={setLoading}
                    setToastType={setToastType}
                />
                <NewVehicle
                    setNotification={setNotification}
                    setLoading={setLoading}
                    setToastType={setToastType}
                />
                <ProfileModal
                    username={username}
                    setLoading={setLoading}
                />
                <LogoutModal
                    setUsername={setUsername}
                    setNotification={setNotification}
                    setToastType={setToastType}
                />
            </main>
        </>
    );
};

export default MainPage;
