import { useState } from "react";
import { registerUser, loginUser } from "../api";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Register({ setUser }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Register user
      await registerUser(form);

      // ✅ Auto-login after registration
      const user = await loginUser({ email: form.email, password: form.password });

      // ✅ Store user locally and update React state
      localStorage.setItem("user", JSON.stringify(user));
      if (setUser) setUser(user);

      // ✅ Redirect to feed
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);

      // Friendly error messages
      if (err.message.includes("Duplicate") || err.message.includes("UNIQUE")) {
        setError("Username or email already exists. Please try a different one.");
      } else if (err.message.includes("400")) {
        setError("Invalid registration details. Please check your inputs.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome 👋</h1>
        <p className="auth-subtitle">Create an account to start exchanging skills</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
            required
          />

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

          <button className="auth-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}


