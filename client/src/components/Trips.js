import React, { useContext, useState } from "react";
import NavBar from "./Navbar";
import { UserContext } from "./UserContext";
import TripCard from "./TripCard";
import { TripContext } from "./UserContext";
import "./Trips.css"



function Trips() {
    const { username } = useContext(UserContext)
    const { trips, setTrips } = useContext(TripContext);


    async function handleDelete(tripId) {
        try {
            const response = await fetch(`http://127.0.0.1:5555/trips/${tripId}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                setTrips(trips.filter(trip => trip.id !== tripId));
            } else {
                console.error('Failed to delete the trip');
            }
        } catch (error) {
            console.error('Error:', error)
        }


    }

    return (
        <>
            <NavBar />
            <h2>Trip Planner</h2>
            {<h2>Welcome {username}!</h2>}
            <div className="trips-list">
                {trips.map((trip, index) => (
                    <TripCard

                        key={index}
                        id={trip.id}
                        title={trip.title}
                        startDate={trip.start_date}
                        endDate={trip.end_date}
                        description={trip.description}
                        handleDelete={() => handleDelete(trip.id)}
                    />
                ))}
            </div>

        </>
    )
}

export default Trips