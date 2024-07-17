import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();
const TripContext = createContext();

const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [trips, setTrips] = useState([]);

    const addTrip = (newTrip) => {
        setTrips([...trips, newTrip]);
    };

    useEffect(() => {
        fetch('http://127.0.0.1:5555/trips')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTrips(data);
            })
            .catch(error => {
                console.error("There was an error fetching the trips!", error);
            });
    }, []);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            <TripContext.Provider value={{ trips, addTrip, setTrips }}>
                {children}
            </TripContext.Provider>
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider, TripContext };