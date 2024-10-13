import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/register";
import LandingPage from "../pages/landingpage";
import LoginPassword from "../pages/loginPassword";
import LoginEmail from "../pages/loginEmail";
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
                path: "login-email",
                element: <AuthLayouts><LoginEmail/></AuthLayouts>
            },
            {
                path: "login-password",
                element: <AuthLayouts><LoginPassword/></AuthLayouts>
            },
            {
                path: "",
                element:<LandingPage />,

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