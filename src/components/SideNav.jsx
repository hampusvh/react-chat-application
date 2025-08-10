
import { useNavigate } from "react-router-dom";

import "../styles/SideNav.css";

function SideNav() {
    const navigate = useNavigate();

    const avatar = localStorage.getItem("avatar");
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <aside className="sidenav">
            <div className="user-info">
                <img src={avatar} alt="avatar" className="avatar" />
                <p className="user-name">{username}</p>

                <button onClick={() => navigate("/profile")} className="profile-button">
                    ⚙
                </button>
            </div>
            <div className="message-list-placeholder">
                <p>No conversations yet</p>
            </div>
            <button onClick={handleLogout} className="logout-button">
                Sign out
            </button>
        </aside>
    );
}

export default SideNav;