import React, { createContext, useState } from "react";

const UserContext = createContext();
const TripContext = createContext();

const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [trip, setTrip] = useState([]);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            <TripContext.Provider value={{ trip, setTrip }}>
                {children}
            </TripContext.Provider>
        </UserContext.Provider>

    );
}

export { UserContext, UserProvider, TripContext }