import { useState, useEffect } from "react";
import useApiFetch from "../hooks/useApiFetch";
import type {
    ApiResponse,
    PanelProp,
    RecentSalesObject,
} from "../props/PropInterfaces";

const RecentSalesPanel = ({ username, setInitState }: PanelProp) => {
    const { getRequest } = useApiFetch();
    const [recentSales, setRecentSales] = useState<RecentSalesObject[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response: ApiResponse = await getRequest({
                endpoint: `/transactions/agent/${username}`,
            });
            if (response.status !== 200) {
                setInitState((prev) => ({
                    ...prev,
                    recentSales: true,
                }));
                return;
            }
            if (!response.responseData) {
                setInitState((prev) => ({
                    ...prev,
                    recentSales: true,
                }));
                return;
            }
            setRecentSales(response.responseData.recentTransactions!);
            setInitState((prev) => ({
                ...prev,
                recentSales: true,
            }));
        };

        fetchData();
    }, []);
    return (
        <div className=" row-span-6 col-span-1 p-2">
            <div className="card w-full h-full bg-base-100 p-2">
                <h1 className="text-primary text-xl pl-5">Your Recent Sales</h1>
                <div className="overflow-y-auto  h-full">
                    <table className="table mt-2 outline-none">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Make</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSales.length === 0 ? (
                                <tr>
                                    <td
                                        key="02"
                                        colSpan={3}
                                        className="text-center text-gray-500 cursor-default select-none"
                                    >
                                        No Data
                                    </td>
                                </tr>
                            ) : (
                                recentSales!.map((recentSale) => (
                                    <tr
                                        key={`${recentSale.date}${recentSale.vehicle.make}`}
                                        className="hover:bg-base-300"
                                    >
                                        <td>
                                            {new Date(
                                                recentSale.date,
                                            ).toDateString()}
                                        </td>
                                        <td>{recentSale.vehicle.make}</td>
                                        <td>{recentSale.vehicle.year}</td>
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

export default RecentSalesPanel;
