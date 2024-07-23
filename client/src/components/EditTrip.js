import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Formik, Form, Field, ErrorMessage } from "formik";
import NavBar from "./Navbar";


function EditTrip() {
    const { tripId } = useParams()
    const [initialValues, setInitialValues] = useState({
        title: "",
        start_date: "",
        end_date: "",
        description: ""
    });

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/trips/${tripId}`)
            .then((r) => r.json())
            .then((trip) => {
                setInitialValues({
                    title: trip.title,
                    start_date: trip.start_date,
                    end_date: trip.end_date,
                    description: trip.description
                });
            });
    }, [tripId]);



    function handleSubmit(values, { setSubmitting }) {


        fetch(`http://127.0.0.1:5555/trips/${tripId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then((r) => r.json())
            .then((updatedTrip) => {
                console.log(updatedTrip);
                setSubmitting(false)
            });
    };

    return (
        <>

            <NavBar />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                enableReinitialize
            />
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label>Title:</label>
                        <Field type="text" name="title" />
                        <ErrorMessage name="title" component="div" />
                    </div>
                    <div>
                        <label>Start Date:</label>
                        <Field type="date" name="start_date" />
                        <ErrorMessage name="start_date" component="div" />
                    </div>
                    <div>
                        <label>End Date:</label>
                        <Field type="date" name="end_date" />
                        <ErrorMessage name="end_date" component="div" />
                    </div>
                    <div>
                        <label>Description:</label>
                        <Field type="textarea" name="description" />
                        <ErrorMessage name="description" component="div" />
                    </div>
                    <button type="submit">Save Changes</button>
                </Form>
            )}
        </>
    )

}

export default EditTrip;