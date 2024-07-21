import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./Navbar";
import "./AddDestination.css"
import TripCard from "./TripCard";
import { DestinationContext, TripContext } from "./UserContext";

function AddDestination() {
    const { destinations, setDestinations } = useContext(DestinationContext);
    const { trips } = useContext(TripContext);
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [timeZone, setTimeZone] = useState("")
    const { tripId } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDestination = { city, state, country, time_zone: timeZone };
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
                setDestinations([...destinations, data]);
                setCity("");
                setState("");
                setCountry("");
                setTimeZone("");
            })
            .catch(error => {
                console.error("There was an error creating the destination!", error);
            });
    };

    return (
        <>
            <NavBar />

            <div className="AddDestination-container">
                <h2>Add Destination</h2>
                <div>
                    <form className="AddDestination-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>City:</label>
                            <input
                                type="text"
                                id="destination-city"
                                name="destination-city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>State:</label>
                            <input
                                type="text"
                                id="destination-state"
                                name="destination-state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Country:</label>
                            <input
                                type="text"
                                id="destination-country"
                                name="destination-country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Time Zone:</label>
                            <input
                                type="text"
                                id="destination-time-zone"
                                name="destination-time-zone"
                                value={timeZone}
                                onChange={(e) => setTimeZone(e.target.value)}
                            />
                        </div>
                        <button type="submit">Create Destination</button>
                    </form>
                </div>

            </div>
        </>
    )
}


export default AddDestination;