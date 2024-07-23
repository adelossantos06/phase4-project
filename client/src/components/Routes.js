import App from "./App"
import CreateTrip from "./CreateTrip"
import Trips from "./Trips"
import AddDestination from "./AddDestination"
import EditTrip from "./EditTrip"

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
            },
            {
                path: "/trips/:tripId",
                element: <EditTrip />
            },
        ]
    }
]

export default routes