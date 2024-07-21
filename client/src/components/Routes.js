import App from "./App"
import CreateTrip from "./CreateTrip"
import Trips from "./Trips"
import AddDestination from "./AddDestination"

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/trips",
                element: <Trips />
            },
            {
                path: "/createtrip",
                element: <CreateTrip />
            },
            {
                path: "/destinations/:tripId",
                element: <AddDestination />
            }
        ]
    }
]

export default routes