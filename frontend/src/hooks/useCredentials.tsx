import { useEffect, useState } from "react";

const useCredentials = () => {
    const [username, setUsername] = useState<string>((): string => {
        return localStorage.getItem("username") || "";
    });

    useEffect(() => {
        if (username) {
            localStorage.setItem("username", username);
        }
    }, [username]);

    return { username, setUsername };
};

export default useCredentials;
