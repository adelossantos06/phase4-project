import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Trips from "./Trips"


import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { DestinationContext, UserProvider } from "./UserContext";
import CreateTrip from "./CreateTrip";
import AddDestination from "./AddDestination";
import EditTrip from "./EditTrip";
// import { UserProvider } from './UserContext';


function App() {
  const [user, setUser] = useState(null);



  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        } else {
          console.error("Unauthorized: Please log in");
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
      });
  }, []);

  if (!user) {
    return <SignIn onSignIn={setUser} />
  }


  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn onSignIn={setUser} />
          </Route>
          <Route path="/signup" component={SignUp} />
          <Route path="/trips" component={Trips} />
          <Route path="/createtrip" component={CreateTrip} />
          <Route path="/trips/${tripId}" component={EditTrip} />
          <Route path="/destinations/:tripId" component={AddDestination} />
        </Switch>

      </Router>
    </UserProvider>

  );

}

export default App;
