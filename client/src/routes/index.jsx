import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/register";
import Home from "../pages/home";
import Login from "../pages/login";
import CheckEmail from "../pages/checkEmail";
import MessagePage from "../components/messagePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // Parent route
        children: [
            {
                path: "register",
                element: <Register />
            },
            {
                path: "email",
                element: <CheckEmail />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "home",
                element: <Home />,
                children: [
                    {
                        path: ":userId",
                        element: <MessagePage />
                    }
                ]
            }
        ]
    }
]);

export default router;