import { useState } from "react";
import { sendRequest } from "../api";
import "./RequestModal.css";

export default function RequestModal({ skill, onClose }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [message, setMessage] = useState("");
  const [contact, setContact] = useState(user?.email || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!message) {
      setError("Message required");
      return;
    }

    try {
      await sendRequest({
        skillId: skill.id,
        requesterName: user.username,
        requesterEmail: user.email,
        requesterContact: contact,
        receiverEmail: skill.contact, // ✅ VERY IMPORTANT
        message,
      });

      setSuccess("Request sent successfully ✅");
      setMessage("");
    } catch {
      setError("Failed to send request ❌");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Request Skill</h3>

        <p>
          <strong>{skill.skill}</strong> — {skill.name}
        </p>

        {success && <div className="success">{success}</div>}
        {error && <div className="error">{error}</div>}

        <textarea
          placeholder="Write your request message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          placeholder="Your contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Send Request</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

