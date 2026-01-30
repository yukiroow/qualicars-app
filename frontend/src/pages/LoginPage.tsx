import type { ApiResponse, StateProps } from "../props/PropInterfaces";
import {
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
    type KeyboardEvent,
} from "react";
import NotificationToast from "../components/NotificationToast";
import Spinner from "../components/Spinner";
import useApiFetch from "../hooks/useApiFetch";

const LoginPage = ({
    username,
    notification,
    handleLoginSuccess,
    setPage,
    setNotification,
}: StateProps) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [fieldErrors, setFieldErrors] = useState({
        usernameErr: false,
        passwordErr: false,
    });
    const [loading, setLoading] = useState(false);
    const { postRequest } = useApiFetch();

    useEffect(() => {
        if (username) {
            setPage!(1);
        }
    }, [username, setPage]);

    const validateFields = (): boolean => {
        if (!credentials.username && credentials.password) {
            setFieldErrors((prevData) => ({
                ...prevData,
                usernameErr: true,
            }));
            setNotification!("Please enter your username!");
            setLoading(false);
            return false;
        }

        if (credentials.username && !credentials.password) {
            setFieldErrors((prevData) => ({
                ...prevData,
                passwordErr: true,
            }));
            setNotification!("Please enter your password!");
            setLoading(false);
            return false;
        }

        if (!credentials.username && !credentials.password) {
            setFieldErrors({
                usernameErr: true,
                passwordErr: true,
            });
            setNotification!("Please enter your account credentials!");
            setLoading(false);
            return false;
        }

        return true;
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();
        setLoading(true);

        if (!validateFields()) {
            setLoading!(false);
            return;
        }

        const formData = new FormData();
        formData.append("username", credentials.username);
        formData.append("password", credentials.password);

        const response: ApiResponse = await postRequest({ endpoint: "/agents/login", payload: formData });
        switch (response.status) {
            case 200:
                if (response.responseData && (response.responseData as any).token) {
                    const token = (response.responseData as any).token as string;
                    const expirationTime = Date.now() + 3600 * 1000;
                    localStorage.setItem("jwtToken", token);
                    localStorage.setItem("jwtTokenExpiration", expirationTime.toString());
                }
                handleLoginSuccess!(credentials.username);
                setPage!(1);
                setLoading(false);
                break;
            case 401:
                setNotification!("Invalid username or password");
                setLoading(false);
                break;
            case 500:
                setNotification!(
                    "There is a problem with our server. Please try again later.",
                );
                setLoading(false);
                break;
            default:
                setNotification!("Please check your network connection.");
                setLoading(false);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setCredentials((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === " ") {
            event.preventDefault();
        }
    };

    return (
        <>
            {notification && setNotification && (
                <NotificationToast
                    message={notification}
                    type={0}
                    setNotification={setNotification}
                />
            )}
            {loading && <Spinner />}
            <div className="flex flex-row h-screen w-screen justify-center items-center bg-base-100 gap-15">
                <picture>
                    <source
                        media="(prefers-color-scheme: dark)"
                        srcSet="/logo-dark.png"
                    />
                    <img
                        src="/logo.png"
                        alt="Qualicars Logo"
                        className="object-cover rounded-full size-70"
                    />
                </picture>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-[20vw] min-w-52"
                >
                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend">Username</legend>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            maxLength={25}
                            placeholder="Enter your username"
                            className={`input w-full ${fieldErrors.usernameErr === true ? "input-error" : ""}`}
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>

                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            maxLength={25}
                            className={`input w-full ${fieldErrors.passwordErr === true ? "input-error" : ""}`}
                        />
                    </fieldset>
                    <button
                        type="submit"
                        className="btn min-w-20 w-1/3 btn-primary mt-4 ml-auto"
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
