import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";
import "./Auth.css";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginUser(form);

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ UPDATE REACT STATE (THIS WAS MISSING)
      setUser(user);

      // ✅ Redirect
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back 👋</h1>
        <p className="auth-subtitle">
          Login to continue exchanging skills
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="auth-btn">Login</button>
        </form>

        <div className="auth-footer">
          <span>Don’t have an account?</span>
          <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}


