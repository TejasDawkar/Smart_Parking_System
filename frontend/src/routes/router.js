import { createBrowserRouter, Navigate } from "react-router-dom";
import UserRegistration from "../pages/User/userRegistration";
import Pass from "../pages/Pass/pass";

export const router = createBrowserRouter([
    {path: "/", element: <Navigate to="/register" replace />}, // Redirects from "/" to "/users" 
    {path: '/register', element:<UserRegistration/>},
    {path: '/pass', element:<Pass/>}
])