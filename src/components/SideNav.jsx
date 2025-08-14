import { useNavigate } from "react-router-dom";
import MessageList from "./MessageList";

import "../styles/SideNav.css";

function SideNav({ conversations = [], activeId, onSelect }) {
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
                <div className="user-settings-row">
                    <p className="user-name">{username}</p>
                    <button onClick={() => navigate("/profile")} className="profile-button">
                        ⚙
                    </button>
                </div>
            </div>
            <div className="message-list-container">
                <MessageList
                    conversations={conversations}
                    activeId={activeId}
                    onSelect={onSelect}
                />
            </div>
            <button onClick={handleLogout} className="logout-button">
                Sign out
            </button>
        </aside>
    );
}

export default SideNav;