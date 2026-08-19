import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    logout
} from "../services/api";


function Navbar() {

    const navigate = useNavigate();

    const token =
        localStorage.getItem(
            "access_token"
        );


    function handleLogout() {

        logout();

        navigate("/login");
    }


    return (

        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >
                PULSE<span>FIT</span>
            </Link>


            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/book">
                    Book
                </Link>

                {token && (

                    <Link to="/appointments">
                        My Bookings
                    </Link>

                )}

                {!token ? (

                    <Link
                        to="/login"
                        className="nav-button"
                    >
                        Login
                    </Link>

                ) : (

                    <button
                        onClick={handleLogout}
                        className="nav-button"
                    >
                        Logout
                    </button>

                )}

            </div>

        </nav>
    );
}

export default Navbar;