import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Trips from "./Trips"
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from "./UserContext";
import CreateTrip from "./CreateTrip";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users")
      .then((r) => r.json())
      .then((data) => setData(data));
  }, []);



  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/trips" component={Trips} />
          <Route path="/createtrip" component={CreateTrip} />
        </Switch>
      </Router>
    </UserProvider>
  );

}

export default App;
