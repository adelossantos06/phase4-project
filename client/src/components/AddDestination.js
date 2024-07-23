import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./Navbar";
import "./AddDestination.css";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { DestinationContext } from "./UserContext";

function AddDestination() {
    const { setDestinations } = useContext(DestinationContext);
    const [trip, setTrip] = useState(null);
    const [tripDestinations, setTripDestinations] = useState([]);
    const { tripId } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/trips/${tripId}`)
            .then(response => response.json())
            .then(data => setTrip(data))
            .catch(error => {
                console.error("Error fetching trip details:", error);
            });
    }, [tripId]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/trips/${tripId}/destinations`)
            .then(response => response.json())
            .then(data => setTripDestinations(data))
            .catch(error => {
                console.error("Error fetching trip destinations:", error);
            });
    }, [tripId]);

    const validationSchema = Yup.object({
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        timeZone: Yup.string().required('Time Zone is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        const newDestination = {
            city: values.city,
            state: values.state,
            country: values.country,
            time_zone: values.timeZone
        };

        console.log("Submitting destination:", newDestination);

        fetch(`http://127.0.0.1:5555/trips/${tripId}/destinations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDestination),
        })
            .then(response => response.json())
            .then(data => {
                setTripDestinations(prevDestinations => [...prevDestinations, data]);
                resetForm(); // Reset form values after successful submission
            })
            .catch(error => {
                console.error("There was an error creating the destination!", error);
            });
    };

    return (
        <>
            <NavBar />

            <div className="AddDestination-container">
                {trip && (
                    <div className="trip-card">
                        <h2 className="trip-card-title">{trip.title}</h2>
                        <p><strong>Start Date:</strong> {trip.start_date}</p>
                        <p><strong>End Date:</strong> {trip.end_date}</p>
                        <p><strong>Description:</strong> {trip.description}</p>
                    </div>
                )}
                <h2>Add Destination</h2>
                <Formik
                    initialValues={{ city: '', state: '', country: '', timeZone: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="AddDestination-form">
                            <div className="form-group">
                                <label htmlFor="city">City:</label>
                                <Field
                                    type="text"
                                    id="city"
                                    name="city"
                                    className={errors.city && touched.city ? "input-error" : ""}
                                />
                                {errors.city && touched.city && <div className="error">{errors.city}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State:</label>
                                <Field
                                    type="text"
                                    id="state"
                                    name="state"
                                    className={errors.state && touched.state ? "input-error" : ""}
                                />
                                {errors.state && touched.state && <div className="error">{errors.state}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country:</label>
                                <Field
                                    type="text"
                                    id="country"
                                    name="country"
                                    className={errors.country && touched.country ? "input-error" : ""}
                                />
                                {errors.country && touched.country && <div className="error">{errors.country}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="timeZone">Time Zone:</label>
                                <Field
                                    type="text"
                                    id="timeZone"
                                    name="timeZone"
                                    className={errors.timeZone && touched.timeZone ? "input-error" : ""}
                                />
                                {errors.timeZone && touched.timeZone && <div className="error">{errors.timeZone}</div>}
                            </div>
                            <button type="submit">Create Destination</button>
                        </Form>
                    )}
                </Formik>
            </div>

            {tripDestinations.length > 0 && (
                <div className="trip-card">
                    <h3>Destinations:</h3>
                    <ul>
                        {tripDestinations.map(dest => (
                            <li key={dest.id}>
                                <strong>{dest.city}, {dest.state}, {dest.country}</strong> - Time Zone: {dest.time_zone}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default AddDestination;