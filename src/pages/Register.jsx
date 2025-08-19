import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth";
import "../styles/Auth.css";

const Register = () => {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        avatar: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError("");
        if (success) setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await registerUser(form);
            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(err.message || "Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="url"
                        name="avatar"
                        placeholder="Avatar URL"
                        value={form.avatar}
                        onChange={handleChange}
                    />
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <button className="auth-button" type="submit">Sign up</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
