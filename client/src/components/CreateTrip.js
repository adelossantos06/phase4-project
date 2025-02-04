import React, { useState, useContext } from "react";
import "./CreateTrip.css";
import NavBar from "./Navbar";
import { TripContext } from './UserContext';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CreateTrip() {
    const { trips, setTrips } = useContext(TripContext);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();



    function handleSubmit(e) {
        e.preventDefault();

        // const user_id = localStorage.getItem('user_id');
        // const authToken = localStorage.getItem('authToken');

        const formData = {
            title,
            start_date: startDate,
            end_date: endDate,
            description,
            // user_id: user_id
        };

        console.log(formData)



        fetch("http://127.0.0.1:5555/trips", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create trip');
                }
                return response.json();
            })
            .then(data => {
                console.log('Trip created:', data);
                setTrips([...trips, data]);
                // NOT WORKING ?
                setTitle("");
                setStartDate("");
                setEndDate("");
                setDescription("");
                history.push("/trips")
            })
            .catch(error => {
                console.error('API Error:', error);
                alert('An error occurred. Please try again.');
            });

    }



    return (
        <>
            <NavBar />
            <div className="create-trip-container">
                <h2>Create a New Trip</h2>
                <form className="create-trip-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Trip Title:</label>
                        <input
                            type="text"
                            id="trip-title"
                            name="trip-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            id="start-date"
                            name="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date:</label>
                        <input
                            type="date"
                            id="end-date"
                            name="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit">Create Trip</button>
                </form >

            </div >
        </>
    );
}



export default CreateTrip;