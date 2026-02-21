import { useState } from "react";
import { updateProfile } from "../api";
import "./Profile.css";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // ✅ Hooks always called
  const [form, setForm] = useState({
    username: storedUser?.username || "",
    bio: storedUser?.bio || "",
    phone: storedUser?.phone || "",
    city: storedUser?.city || "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!storedUser) return; // extra safety

    try {
      const updatedUser = await updateProfile(storedUser.id, {
        ...storedUser,
        ...form,
      });

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSuccess("Profile updated successfully ✅");
    } catch (err) {
      setError("Failed to update profile ❌");
    }
  };

  // Render different content if no user
  if (!storedUser) {
    return (
      <div className="card">
        <h3>Session expired</h3>
        <p>Please login again.</p>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <h2>Your Profile</h2>

      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <label>Email (cannot change)</label>
        <input value={storedUser.email} disabled />

        <label>Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label>Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Tell something about yourself"
        />

        <label>Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <label>City</label>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
