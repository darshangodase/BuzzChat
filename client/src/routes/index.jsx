import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/register";
import Home from "../pages/home";
import Login from "../pages/login";
import CheckEmail from "../pages/checkEmail";
import MessagePage from "../components/messagePage";
import AuthLayouts from "../layout/index";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, 
        children: [
            {
                path: "register",
                element: <AuthLayouts><Register /></AuthLayouts>
                
            },
            {
                path: "email",
                element: <AuthLayouts><CheckEmail /></AuthLayouts>
            },
            {
                path: "login",
                element: <AuthLayouts><Login /></AuthLayouts>
            },
            {
                path: "",
                element: <AuthLayouts><Home /></AuthLayouts>,
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