import {
    useEffect,
    useState
} from "react";

import {
    getAppointments,
    cancelAppointment
} from "../services/api";


function MyAppointments() {

    const [
        appointments,
        setAppointments
    ] = useState([]);

    const [
        error,
        setError
    ] = useState("");


    async function loadAppointments() {

        try {

            const data =
                await getAppointments();

            setAppointments(data);

        } catch (error) {

            setError(
                error.message
            );
        }
    }


    useEffect(() => {

        loadAppointments();

    }, []);


    async function handleCancel(id) {

        const confirmed =
            window.confirm(
                "Cancel this appointment?"
            );

        if (!confirmed) return;

        try {

            await cancelAppointment(id);

            loadAppointments();

        } catch (error) {

            setError(
                error.message
            );
        }
    }


    return (

        <main className="page">

            <div className="container">

                <p className="eyebrow">
                    YOUR PULSEFIT
                </p>

                <h1>
                    My Bookings
                </h1>


                {error && (

                    <div className="error">
                        {error}
                    </div>

                )}


                {appointments.length === 0 ? (

                    <div className="empty">

                        <h2>
                            No bookings yet.
                        </h2>

                        <p>
                            Your upcoming
                            sessions will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="appointments">

                        {appointments.map(
                            appointment => (

                                <div
                                    className="appointment-card"
                                    key={
                                        appointment.id
                                    }
                                >

                                    <div>

                                        <h3>
                                            {
                                                appointment.service_name
                                            }
                                        </h3>

                                        <p>
                                            {
                                                appointment.date
                                            }
                                        </p>

                                        <p>
                                            {
                                                appointment.start_time
                                            }
                                        </p>

                                    </div>


                                    <div>

                                        <span
                                            className={
                                                `status ${appointment.status}`
                                            }
                                        >
                                            {
                                                appointment.status
                                            }
                                        </span>


                                        {appointment.status !==
                                            "cancelled" && (

                                            <button
                                                onClick={() =>
                                                    handleCancel(
                                                        appointment.id
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>

                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </main>
    );
}

export default MyAppointments;