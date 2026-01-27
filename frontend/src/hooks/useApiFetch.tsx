import { useState } from "react";
import type { ApiResponse, FetchProps } from "../props/PropInterfaces";

// const serverUrl = import.meta.env.VITE_API_URL;
const serverUrl = "http://192.168.15.199:8080/api";

const useApiFetch = () => {
    const [responseData, setResponseData] = useState({});

    const deleteRequest = async ({
        endpoint,
    }: FetchProps): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${serverUrl}${endpoint}`, {
                method: "DELETE",
            });
            if (response.status === 200) {
                const data = await response.json();
                setResponseData(data);
                return {
                    responseData,
                    status: response.status,
                };
            }
            return {
                status: response.status,
            };
        } catch (err) {
            console.log(err);
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
            });
            if (response.status === 204) {
                const data = await response.json();
                setResponseData(data);
                return {
                    responseData,
                    status: response.status,
                };
            }
            return {
                status: response.status,
            };
        } catch (err) {
            console.log(err);
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
            });
            return {
                status: response.status,
            };
        } catch (err) {
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
            });
            if (response.status === 200) {
                const data = await response.json();
                setResponseData(data);
                return {
                    responseData: data,
                    status: response.status,
                };
            }
            return {
                status: response.status,
            };
        } catch (err) {
            return {
                status: 500,
            };
        }
    };

    return { getRequest, postRequest, putRequest, deleteRequest };
};

export default useApiFetch;
