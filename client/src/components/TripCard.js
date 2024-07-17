import React from "react";
import "./TripCard.css"


function TripCard({ id, title, startDate, endDate, description, handleDelete }) {

    return (
        <div className="trip-card">
            <h2 className="trip-card-title">{title}</h2>
            <p>Start Date: {startDate}</p>
            <p>End Date: {endDate}</p>
            <p>{description}</p>
            <div className="button-container">
                <button className="button edit-trip">Edit Trip Details</button>
                <button className="button trip-destinations">Add / View Destinations</button>
                <button onClick={() => handleDelete(id)} className="button delete-trip">Delete Trip</button>
            </div>
        </div>
    )
}

export default TripCard;