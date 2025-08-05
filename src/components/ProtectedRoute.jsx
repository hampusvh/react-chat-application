import { Navigate } from "react-router-dom";
import { isExpired } from "../utils/jwt"; // Kontrollera om token är utgången

function ProtectedRoute({ children }) {
    // Hämta token från localStorage
    const token = localStorage.getItem("token");

    // Om ingen token finns eller den är utgången → redirect till /login
    if (!token || isExpired(token)) {
        return <Navigate to="/login" replace />;
    }

    // Om allt är okej → rendera det skyddade innehållet
    return children;
}

export default ProtectedRoute;
