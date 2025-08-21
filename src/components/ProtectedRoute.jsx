import { Navigate } from "react-router-dom";
import { isExpired } from "../utils/jwt";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token || isExpired(token)) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
