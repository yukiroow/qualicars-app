import { currencyConverter } from "../util/utils";
import type {
    ApiResponse,
    PanelProp,
    TransactionObject,
} from "../props/PropInterfaces";
import useApiFetch from "../hooks/useApiFetch";
import { useEffect, useState } from "react";

const TransactionsPanel = ({ setInitState }: PanelProp) => {
    const { getRequest } = useApiFetch();
    const [transactions, setTransactions] = useState<TransactionObject[]>();
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>();

    useEffect(() => {
        const fetchData = async () => {
            setInitState((prev) => ({ ...prev, transactions: false }));
            const response: ApiResponse = await getRequest({
                endpoint: `/transactions?page=${page}&size=20`,
            });
            if (response.status === 200 && response.responseData) {
                setTransactions(response.responseData.transactions);
                setTotalPages(response.responseData.totalPages);
                setInitState((prev) => ({ ...prev, transactions: true }));
            }
        };

        fetchData();
    }, [page]);
    return (
        <div className="row-span-10 col-span-2 p-2">
            <div className="card w-full h-full  bg-base-100 p-2 pl-5">
                <div className="flex flex-row gap-2">
                    <h1 className="text-primary text-xl">All transactions</h1>
                    <div className="join ml-auto">
                        <button
                            className="join-item btn btn-sm"
                            disabled={page === 0}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            «
                        </button>
                        <button className="join-item btn btn-sm">
                            {page! + 1}
                        </button>
                        <button
                            className="join-item btn btn-sm"
                            disabled={page! >= totalPages! - 1}
                            onClick={() => setPage((p) => p! + 1)}
                        >
                            »
                        </button>
                    </div>
                </div>
                <div className="overflow-y-auto h-full">
                    <table className="table table-pin-rows overflow-y-auto outline-none">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th className="whitespace-nowrap">Date</th>
                                <th>Amount</th>
                                <th>Make</th>
                                <th>Color</th>
                                <th>Year</th>
                                <th>Engine No</th>
                                <th>Chassis No</th>
                                <th>Customer Name</th>
                                <th>Agent</th>
                                <th>Agent Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!transactions ? (
                                <tr key="03">
                                    <td
                                        colSpan={11}
                                        className="text-center text-gray-500 cursor-default select-none"
                                    >
                                        No Data
                                    </td>
                                </tr>
                            ) : (
                                transactions!.map((transaction) => (
                                    <tr
                                        key={transaction.vehicle.chassis_no}
                                        className="hover:bg-base-300"
                                    >
                                        <td>{transaction.transaction_id}</td>
                                        <td className="whitespace-nowrap">
                                            {new Date(transaction.date)
                                                .toDateString()
                                                .replace(/\n/g, " ")}
                                        </td>
                                        <td>
                                            {currencyConverter.format(
                                                transaction.amount,
                                            )}
                                        </td>
                                        <td>{transaction.vehicle.make}</td>
                                        <td>{transaction.vehicle.color}</td>
                                        <td>{transaction.vehicle.year}</td>
                                        <td>{transaction.vehicle.engine_no}</td>
                                        <td>
                                            {transaction.vehicle.chassis_no}
                                        </td>
                                        <td>{transaction.customer.name}</td>
                                        <td>{transaction.agent.fullName}</td>
                                        <td>{transaction.agent.username}</td>
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

export default TransactionsPanel;
