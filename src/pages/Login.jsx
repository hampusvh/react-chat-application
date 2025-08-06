import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import { decodeToken } from "../utils/jwt";
import "../styles/Auth.css";

function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { token } = await loginUser(form);// du returnerar bara token-sträng
            const decoded = decodeToken(token);  // plockar ut info från token
            // console.log("Decoded token:", decoded);

            // Spara token + användardata i localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userId", decoded?.sub);
            localStorage.setItem("username", decoded?.user);
            localStorage.setItem("avatar", decoded?.avatar);

            navigate("/chat");
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Log in</button>
            </form>
            <p>Don't have an account? <Link to="/register">Sign up!</Link></p>
        </div>
    );
}

export default Login;
