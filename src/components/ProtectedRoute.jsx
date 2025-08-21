import { Navigate, Outlet } from "react-router-dom";
import { isExpired } from "../utils/jwt";

function ProtectedRoute() {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
