import { useState } from "react";
import type { ApiResponse, FetchProps } from "../props/PropInterfaces";
import useCredentials from "./useCredentials";

const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const useApiFetch = () => {
    const [responseData, setResponseData] = useState({});
    const { handleLogout } = useCredentials();

    const deleteRequest = async ({
        endpoint,
    }: FetchProps): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${serverUrl}${endpoint}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.status === 200) {
                const data = await response.json();
                setResponseData(data);
                return {
                    responseData,
                    status: response.status,
                };
            } else if (response.status === 401) {
                await handleLogout();
            }
            return {
                status: response.status,
            };
        } catch (err) {
            console.error(err);
            return {
                status: 500,
            };
        }
    };

    const putRequest = async ({
        endpoint,
        payload,
    }: FetchProps): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${serverUrl}${endpoint}`, {
                method: "PUT",
                body: JSON.stringify(payload),
                credentials: "include",
            });
            if (response.status === 204) {
                const data = await response.json();
                setResponseData(data);
                return {
                    responseData,
                    status: response.status,
                };
            } else if (response.status === 401) {
                await handleLogout();
            }
            return {
                status: response.status,
            };
        } catch (err) {
            console.error(err);
            return {
                status: 500,
            };
        }
    };

    const postRequest = async ({
        endpoint,
        payload,
    }: FetchProps): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${serverUrl}${endpoint}`, {
                method: "POST",
                body: payload,
                credentials: "include",
            });
            if (response.status === 401) {
                await handleLogout();
            }
            return {
                status: response.status,
            };
        } catch (err) {
            console.error(err);
            return {
                status: 500,
            };
        }
    };

    const getRequest = async ({
        endpoint,
    }: FetchProps): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${serverUrl}${endpoint}`, {
                method: "GET",
                credentials: "include",
            });
            if (response.status === 200) {
                const data = await response.json();
                setResponseData(data);
                return {
                    responseData: data,
                    status: response.status,
                };
            } else if (response.status === 401 || response.status === 404) {
                await handleLogout();
            }
            return {
                status: response.status,
            };
        } catch (err) {
            console.error(err);
            return {
                status: 500,
            };
        }
    };

    return { getRequest, postRequest, putRequest, deleteRequest };
};

export default useApiFetch;
