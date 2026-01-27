import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import useCredentials from "./hooks/useCredentials";

function App() {
    const { username, setUsername } = useCredentials();
    const [page, setPage] = useState(0);
    const [notification, setNotification] = useState("");

    if (page === 0) {
        return (
            <main>
                <LoginPage
                    username={username}
                    notification={notification}
                    setUsername={setUsername}
                    setPage={setPage}
                    setNotification={setNotification}
                />
            </main>
        );
    }

    if (page === 1) {
        return (
            <MainPage
                username={username}
                notification={notification}
                setUsername={setUsername}
                setPage={setPage}
                setNotification={setNotification}
            />
        );
    }
}

export default App;
