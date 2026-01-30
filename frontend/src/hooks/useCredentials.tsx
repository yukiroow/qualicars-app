import { useState } from "react";
const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const useCredentials = () => {
    const [username, setUsername] = useState<string>(() => {
        return localStorage.getItem("username") || "";
    });

    const handleLoginSuccess = (name: string) => {
        setUsername(name);
        localStorage.setItem("username", name);
    };

    const handleLogout = async () => {
        try {
            setUsername("");
            localStorage.removeItem("username");
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("jwtTokenExpiration");
            await fetch(`${serverUrl}/agents/logout`, {
                method: "POST",
            });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return { username, handleLoginSuccess, handleLogout };
};

export default useCredentials;
