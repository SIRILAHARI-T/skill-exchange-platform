import { useState } from "react";
import { addSkill } from "../api";
import "./AddSkill.css";

export default function AddSkill({ loadSkills }) {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [form, setForm] = useState({
    name: user.username || "",
    skill: "",
    category: "",
    description: "",
    location: "",
    contact: user.email || "",
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

    if (!form.category) {
      setError("Please select a category");
      return;
    }

    try {
      await addSkill(form);
      setSuccess("Skill added successfully ✅");

      // ✅ Reload feed after successful post
      if (loadSkills) loadSkills();

      // Reset skill fields, keep name/contact
      setForm({
        ...form,
        skill: "",
        category: "",
        description: "",
        location: "",
      });
    } catch (err) {
      setError("Failed to add skill ❌");
    }
  };

  if (!user.username) {
    return (
      <div className="card">
        <h3>Session expired</h3>
        <p>Please login again.</p>
      </div>
    );
  }

  return (
    <div className="add-skill-card">
      <h2>Add a Skill / Service</h2>

      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="add-skill-form">
        <label>Your Name</label>
        <input value={form.name} disabled />

        <label>Skill / Service</label>
        <input
          name="skill"
          value={form.skill}
          onChange={handleChange}
          placeholder="e.g. Web Development"
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          <option value="Teaching">Teaching</option>
          <option value="Technology">Technology</option>
          <option value="Home Services">Home Services</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Design & Art">Design & Art</option>
          <option value="Other">Other</option>
        </select>

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe what you offer"
        />

        <label>Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="City / Area"
        />

        <label>Contact</label>
        <input value={form.contact} disabled />

        <button type="submit">Post Skill</button>
      </form>
    </div>
  );
}
