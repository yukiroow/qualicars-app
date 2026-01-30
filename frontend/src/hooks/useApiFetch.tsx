import type { ApiResponse, FetchProps } from "../props/PropInterfaces";
import useCredentials from "./useCredentials";

const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const useApiFetch = () => {
    const { handleLogout } = useCredentials();

    const getToken = () => {
        const token = localStorage.getItem("jwtToken");
        const expiration = localStorage.getItem("jwtTokenExpiration");

        if (!token || !expiration) return null;

        if (Date.now() > parseInt(expiration, 10)) {

            localStorage.removeItem("jwtToken");
            localStorage.removeItem("jwtTokenExpiration");
            handleLogout();
            return null;
        }

        return token;
    };

    const refreshTokenExpiration = () => {
        const expirationTime = Date.now() + 3600 * 1000;
        localStorage.setItem("jwtTokenExpiration", expirationTime.toString());
    };

    const buildHeaders = (extra: Record<string, string> = {}) => {
        const headers: Record<string, string> = { ...extra };
        const token = getToken();
        if (token) headers["Authorization"] = `Bearer ${token}`;
        return headers;
    };

    const deleteRequest = async ({ endpoint }: FetchProps): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${serverUrl}${endpoint}`, {
                method: "DELETE",
                headers: buildHeaders(),
            });
            if (response.status === 200) {
                refreshTokenExpiration();
                const contentType = response.headers.get("content-type") || "";
                if (contentType.includes("application/json")) {
                    const data = await response.json();
                    return { responseData: data, status: response.status };
                }
                return { status: response.status };
            } else if (response.status === 401) {
                await handleLogout();
            }
            return { status: response.status };
        } catch (err) {
            console.error(err);
            return { status: 500 };
        }
    };

    const putRequest = async ({ endpoint, payload }: FetchProps): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${serverUrl}${endpoint}`, {
                method: "PUT",
                headers: buildHeaders({ "Content-Type": "application/json" }),
                body: JSON.stringify(payload),
            });
            if (response.status === 200 || response.status === 201) {
                refreshTokenExpiration();
                const contentType = response.headers.get("content-type") || "";
                if (contentType.includes("application/json")) {
                    const data = await response.json();
                    return { responseData: data, status: response.status };
                }
                return { status: response.status };
            } else if (response.status === 401) {
                await handleLogout();
            }
            return { status: response.status };
        } catch (err) {
            console.error(err);
            return { status: 500 };
        }
    };

    const postRequest = async ({ endpoint, payload }: FetchProps): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${serverUrl}${endpoint}`, {
                method: "POST",
                headers: buildHeaders(),
                body: payload,
            });
            const contentType = response.headers.get("content-type") || "";
            if (response.status === 200 || response.status === 201) {
                refreshTokenExpiration();
                if (contentType.includes("application/json")) {
                    const data = await response.json();
                    return { responseData: data, status: response.status };
                }
                return { status: response.status };
            } else if (response.status === 401) {
                await handleLogout();
            }
            return { status: response.status };
        } catch (err) {
            console.error(err);
            return { status: 500 };
        }
    };

    const getRequest = async ({ endpoint }: FetchProps): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${serverUrl}${endpoint}`, {
                method: "GET",
                headers: buildHeaders(),
            });
            if (response.status === 200) {
                refreshTokenExpiration();
                const data = await response.json();
                return { responseData: data, status: response.status };
            } else if (response.status === 401 || response.status === 404) {
                await handleLogout();
            }
            return { status: response.status };
        } catch (err) {
            console.error(err);
            return { status: 500 };
        }
    };

    return { getRequest, postRequest, putRequest, deleteRequest };
};

export default useApiFetch;
