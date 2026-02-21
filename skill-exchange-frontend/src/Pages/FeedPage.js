import { useState } from "react";
import RequestModal from "../components/RequestModal";
import "./FeedPage.css";

export default function FeedPage({ skills = [] }) {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <div className="feed">
      {/* Hero / Interactive Section */}
      <div className="feed-hero">
        <h1>Welcome to Skill Exchange 👋</h1>
        <p>
          Discover talented people, request their skills, and collaborate on projects. 
          It's simple: Connect, Showcase, Request, Collaborate!
        </p>
        <div className="hero-icons">
          <div className="icon-card animate-card">🤝 Connect</div>
          <div className="icon-card animate-card">🎨 Showcase</div>
          <div className="icon-card animate-card">📤 Request</div>
          <div className="icon-card animate-card">💬 Collaborate</div>
        </div>
      </div>

      {/* Explanation / Features */}
      <div className="feed-info">
        <div className="info-card">
          <img src="https://img.icons8.com/color/96/000000/idea.png" alt="Idea" />
          <h3>Share Your Skills</h3>
          <p>Add your expertise and let others know what you can do.</p>
        </div>
        <div className="info-card">
          <img src="https://img.icons8.com/color/96/000000/network.png" alt="Network" />
          <h3>Find Talented People</h3>
          <p>Search and filter users by skill, category, or location.</p>
        </div>
        <div className="info-card">
          <img src="https://img.icons8.com/color/96/000000/message-group.png" alt="Message" />
          <h3>Request & Collaborate</h3>
          <p>Send requests, chat, and work together efficiently.</p>
        </div>
      </div>

      {/* Skills Grid */}
      <h2 style={{ marginTop: "40px" }}>Available Skills</h2>
      <div className="skills-grid">
        {skills.length === 0 && <div className="card">No skills available yet.</div>}

        {skills.map((s) => (
          <div key={s.id} className="skill-card">
            <h3>{s.skill}</h3>
            <p><strong>By:</strong> {s.name} · {s.location}</p>
            <p>{s.description}</p>
            <div className="feed-actions">
              <button onClick={() => setSelectedSkill(s)}>Request</button>
            </div>
          </div>
        ))}
      </div>

      {/* Request Modal */}
      {selectedSkill && (
        <RequestModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
}


