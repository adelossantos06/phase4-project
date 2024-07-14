import App from "./App"
import CreateTrip from "./CreateTrip"
import Trips from "./Trips"

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
            }
        ]
    }
]

export default routes