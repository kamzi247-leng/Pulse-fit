import {
    Link
} from "react-router-dom";


function Home() {

    return (

        <main>

            <section className="hero">

                <div className="hero-content">

                    <p className="eyebrow">
                        YOUR FITNESS. YOUR JOURNEY.
                    </p>

                    <h1>
                        BUILD A BODY
                        <br />
                        YOU'RE PROUD OF.
                    </h1>

                    <p>
                        Train smarter, stay consistent,
                        and become your strongest self
                        with PulseFit.
                    </p>

                    <Link
                        to="/book"
                        className="primary-button"
                    >
                        Book a Session
                    </Link>

                </div>

            </section>


            <section className="section">

                <p className="eyebrow">
                    PULSEFIT
                </p>

                <h2>
                    Train with purpose.
                </h2>

                <div className="feature-grid">

                    <div className="feature-card">

                        <h3>
                            Personal Training
                        </h3>

                        <p>
                            Get focused guidance
                            designed around your goals.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            Strength
                        </h3>

                        <p>
                            Build strength,
                            confidence and endurance.
                        </p>

                    </div>


                    <div className="feature-card">

                        <h3>
                            Wellness
                        </h3>

                        <p>
                            Create sustainable habits
                            for a healthier lifestyle.
                        </p>

                    </div>

                </div>

            </section>


            <section className="cta">

                <h2>
                    Ready to get started?
                </h2>

                <Link
                    to="/book"
                    className="primary-button"
                >
                    Start Training
                </Link>

            </section>

        </main>
    );
}

export default Home;