
import { useNavigate } from "react-router-dom";

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
                <p>{username}</p>
            </div>
            <button onClick={() => navigate("/profile")} className="profile-button">
                Profil
            </button>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </aside>
    );
}

export default SideNav;