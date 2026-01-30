import { useEffect, useState } from "react";
import type {
    ApiResponse,
    CustomerObject,
    PanelProp,
} from "../props/PropInterfaces";
import useApiFetch from "../hooks/useApiFetch";

const CustomersPanel = ({ setInitState }: PanelProp) => {
    const [customersData, setCustomersData] = useState<CustomerObject[]>();
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>();
    const { getRequest } = useApiFetch();
    useEffect(() => {
        const fetchData = async () => {
            setInitState((prev) => ({ ...prev, customers: false }));
            const response: ApiResponse = await getRequest({
                endpoint: `/customers?available=true&page=${page}&size=50`,
            });
            if (response.status === 200 && response.responseData) {
                setCustomersData(response.responseData.customers);
                setTotalPages(response.responseData.totalPages);
                setInitState((prev) => ({ ...prev, customers: true }));
            }
        };

        fetchData();
    }, [page]);
    return (
        <div className="row-span-5 col-span-2 p-2">
            <div className="card w-full h-full  bg-base-100 p-2 pl-5">
                <div className="flex flex-row">
                    <h1 className="text-primary text-xl">Customers</h1>
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
                    <table className="table table-pin-rows outline-none">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!customersData ? (
                                <tr key="04">
                                    <td
                                        colSpan={3}
                                        className="text-center text-gray-500 cursor-default select-none"
                                    >
                                        No Data
                                    </td>
                                </tr>
                            ) : (
                                customersData!.map((customer) => (
                                    <tr
                                        key={`${customer.name}${customer.address}`}
                                        className="hover:bg-base-300"
                                    >
                                        <td>{customer.name}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.contact}</td>
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

export default CustomersPanel;
