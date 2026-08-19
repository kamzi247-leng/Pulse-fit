import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getServices,
    createAppointment
} from "../services/api";


function BookAppointment() {

    const navigate = useNavigate();

    const [
        services,
        setServices
    ] = useState([]);

    const [
        service,
        setService
    ] = useState("");

    const [
        name,
        setName
    ] = useState("");

    const [
        phone,
        setPhone
    ] = useState("");

    const [
        date,
        setDate
    ] = useState("");

    const [
        time,
        setTime
    ] = useState("");

    const [
        notes,
        setNotes
    ] = useState("");

    const [
        error,
        setError
    ] = useState("");


    useEffect(() => {

        getServices()
            .then(setServices)
            .catch(error =>
                setError(
                    error.message
                )
            );

    }, []);


    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        try {

            await createAppointment({

                service: Number(service),

                customer_name: name,

                customer_phone: phone,

                date,

                start_time: time,

                notes

            });

            navigate(
                "/appointments"
            );

        } catch (error) {

            setError(
                error.message
            );
        }
    }


    return (

        <main className="page">

            <div className="form-wrapper">

                <p className="eyebrow">
                    PULSEFIT
                </p>

                <h1>
                    Book a Session
                </h1>

                {error && (

                    <div className="error">
                        {error}
                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                >

                    <label>
                        Service

                        <select
                            value={service}
                            onChange={
                                e =>
                                    setService(
                                        e.target.value
                                    )
                            }
                            required
                        >

                            <option value="">
                                Choose a service
                            </option>

                            {services.map(
                                item => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>

                                )
                            )}

                        </select>

                    </label>


                    <label>
                        Name

                        <input
                            value={name}
                            onChange={
                                e =>
                                    setName(
                                        e.target.value
                                    )
                            }
                            required
                        />

                    </label>


                    <label>
                        Phone

                        <input
                            value={phone}
                            onChange={
                                e =>
                                    setPhone(
                                        e.target.value
                                    )
                            }
                        />

                    </label>


                    <label>
                        Date

                        <input
                            type="date"
                            value={date}
                            onChange={
                                e =>
                                    setDate(
                                        e.target.value
                                    )
                            }
                            required
                        />

                    </label>


                    <label>
                        Start time

                        <input
                            type="time"
                            value={time}
                            onChange={
                                e =>
                                    setTime(
                                        e.target.value
                                    )
                            }
                            required
                        />

                    </label>


                    <label>
                        Notes

                        <textarea
                            value={notes}
                            onChange={
                                e =>
                                    setNotes(
                                        e.target.value
                                    )
                            }
                        />

                    </label>


                    <button
                        className="primary-button"
                    >
                        Confirm Booking
                    </button>

                </form>

            </div>

        </main>
    );
}

export default BookAppointment;