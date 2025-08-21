import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import AvatarPreview from "../components/AvatarPreview";
import "../styles/Profile.css";
import { getCsrfToken } from "../api/auth";
import { updateUser, deleteUser } from "../api/user";

const isValidUrl = (url) => {
    try { new URL(url); return true; } catch { return false; }
};

const Profile = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");

    const [error, setError] = useState("");
    const [ok, setOk] = useState("");

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const handleSave = async (e) => {
        e.preventDefault();
        setError(""); setOk("");
        try {
            const csrfToken = await getCsrfToken();
            const updatedData = { username, email, avatar };
            await updateUser({ token, userId, updatedData, csrfToken });

            localStorage.setItem("username", username);
            localStorage.setItem("avatar", avatar);

            setOk("Profile updated");
        } catch (err) {
            setError(err.message || "Update failed");
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!window.confirm("Är du säker på att du vill radera kontot?")) return;
        setError(""); setOk("");
        try {
            const csrfToken = await getCsrfToken();
            await deleteUser({ token, userId, csrfToken });
            localStorage.clear();
            navigate("/login");
        } catch (err) {
            setError(err.message || "Delete failed");
        }
    };

    return (
        <div className="profile-wrapper">

            <SideNav />

            <main className="profile-content">
                <header className="profile-header">
                    <button onClick={() => navigate("/chat")} className="back-button">←</button>
                    <h2>Settings</h2>
                </header>

                <section className="profile-card">
                    <form className="profile-form" onSubmit={handleSave}>
                        <div className="form-row">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" name="username" placeholder="Username"
                                value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="form-row">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" name="email" placeholder="Email"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-row">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" placeholder="New password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="form-row">
                            <label htmlFor="avatar">Avatar URL</label>
                            <input id="avatar" type="url" name="avatar" placeholder="https://…"
                                value={avatar} onChange={(e) => setAvatar(e.target.value)} />
                        </div>

                        {isValidUrl(avatar) && (
                            <div className="avatar-preview-row">
                                <AvatarPreview src={avatar} />
                            </div>
                        )}

                        {error && <div className="error">{error}</div>}
                        {ok && <div className="ok">{ok}</div>}

                        <div className="actions">
                            <button type="button" className="btn ghost" onClick={() => navigate("/chat")}>
                                Cancel
                            </button>
                            <button type="submit" className="btn primary">Save</button>
                        </div>

                        <button type="button" className="delete-account" onClick={handleDelete}>
                            Terminate account
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Profile;
