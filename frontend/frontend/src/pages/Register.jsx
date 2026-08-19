import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    register,
    login
} from "../services/api";


function Register() {

    const navigate = useNavigate();

    const [
        username,
        setUsername
    ] = useState("");

    const [
        email,
        setEmail
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

            await register(
                username,
                email,
                password
            );

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
                    JOIN PULSEFIT
                </p>

                <h1>
                    Create Account
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
                    Email

                    <input
                        type="email"
                        value={email}
                        onChange={
                            e =>
                                setEmail(
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
                        minLength={8}
                        required
                    />

                </label>


                <button
                    className="primary-button"
                >
                    Create Account
                </button>


                <p>
                    Already have an account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </main>
    );
}

export default Register;