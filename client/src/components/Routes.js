import App from "./App"
import Trips from "./Trips"

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/trips",
                element: <Trips />
            }
        ]
    }
]

export default routes