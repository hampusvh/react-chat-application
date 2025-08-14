import SideNav from "../components/SideNav";
import "../styles/Profile.css";

import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="profile-wrapper">
            <SideNav />

            <main className="profile-content">
                <header className="profile-header">
                    <button onClick={() => navigate("/chat")} className="back-button">←</button>
                    <h2>Settings</h2>
                </header>

                <section className="profile-card">
                    <form className="profile-form">
                        <div className="form-row">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="Username" />
                        </div>

                        <div className="form-row">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="Email" />
                        </div>

                        <div className="form-row">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="New password" />
                        </div>

                        <div className="form-row">
                            <label>Avatar URL</label>
                            <input type="text" name="avatar" placeholder="https://…" />
                        </div>

                        <div className="actions">
                            <button type="button" className="btn ghost" onClick={() => navigate("/chat")}>
                                Cancel
                            </button>
                            <button type="button" className="btn primary" disabled>
                                Save (placeholder)
                            </button>
                        </div>
                        <button className="delete-account">Terminate account</button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Profile;
