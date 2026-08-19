import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    login
} from "../services/api";


function Login() {

    const navigate = useNavigate();

    const [
        username,
        setUsername
    ] = useState("");

    const [
        password,
        setPassword
    ] = useState("");

    const [
        error,
        setError
    ] = useState("");


    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        try {

            await login(
                username,
                password
            );

            navigate("/");

        } catch (error) {

            setError(
                error.message
            );
        }
    }


    return (

        <main className="auth-page">

            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >

                <p className="eyebrow">
                    WELCOME BACK
                </p>

                <h1>
                    Login
                </h1>

                {error && (

                    <div className="error">
                        {error}
                    </div>

                )}

                <label>
                    Username

                    <input
                        value={username}
                        onChange={
                            e =>
                                setUsername(
                                    e.target.value
                                )
                        }
                        required
                    />

                </label>


                <label>
                    Password

                    <input
                        type="password"
                        value={password}
                        onChange={
                            e =>
                                setPassword(
                                    e.target.value
                                )
                        }
                        required
                    />

                </label>


                <button
                    className="primary-button"
                >
                    Login
                </button>


                <p>
                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Create one
                    </Link>
                </p>

            </form>

        </main>
    );
}

export default Login;