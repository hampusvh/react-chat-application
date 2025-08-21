import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import { decodeToken } from "../utils/jwt";
import "../styles/Auth.css";

const Login = () => {

    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError("");

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { token } = await loginUser(form);
            // TODO: se över varför decodeToken returnerar null
            const decoded = decodeToken(token);

            localStorage.setItem("token", token);
            localStorage.setItem("userId", decoded?.id);
            localStorage.setItem("username", decoded?.user);
            localStorage.setItem("avatar", decoded?.avatar);

            navigate("/chat");
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}

                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}

                    />
                    {error && <p className="error">{error}</p>}
                    <button className="auth-button" type="submit">Log in</button>
                </form>
                <p>Don't have an account? <Link to="/register">Sign up!</Link></p>
            </div>
        </div>
    );
}

export default Login;