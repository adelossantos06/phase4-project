import React from "react";
import "./TripCard.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import EditTrip from "./EditTrip";


function TripCard({ id, title, startDate, endDate, description, handleDelete }) {

    return (
        <div className="trip-card">
            <h2 className="trip-card-title">{title}</h2>
            <p><strong>Start Date: </strong>{startDate}</p>
            <p><strong>End Date:</strong> {endDate}</p>
            <p><strong>Description:</strong> {description}</p>
            <div className="button-container">
                <NavLink to={`/trips/${id}"`}>
                    <button className="button edit-trip">Edit Trip Details</button>
                </NavLink>

                <NavLink
                    to={{
                        pathname: `/destinations/${id}`,
                        state: { trip: { id, title, startDate, endDate, description, destinations: [] } }
                    }}
                >
                    <button className="button trip-destinations">Add / View Destinations</button>
                </NavLink>
                <button onClick={() => handleDelete(id)} className="button delete-trip">Delete Trip</button>
            </div>
        </div >
    )
}

export default TripCard;