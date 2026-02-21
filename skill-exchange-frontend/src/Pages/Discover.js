import { useState } from "react";
import RequestModal from "../components/RequestModal";

export default function Discover({ skills }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(""); // New state for category
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Filter skills based on search, location, and category
  const filteredSkills = skills.filter((s) => {
    const skillText = s.skill?.toLowerCase() || "";
    const locationText = s.location?.toLowerCase() || "";
    const categoryText = s.category?.toLowerCase() || "";

    return (
      skillText.includes(query.toLowerCase()) &&
      locationText.includes(location.toLowerCase()) &&
      categoryText.includes(categoryFilter.toLowerCase())
    );
  });

  return (
    <>
      {/* Search / Filter Card */}
      <div className="card">
        <h2>Discover Skills</h2>

        <div className="form-grid">
          <input
            placeholder="Search by skill (e.g. Web, Design)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <input
            placeholder="Filter by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* New category dropdown filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">-- All Categories --</option>
            <option value="Teaching">Teaching</option>
            <option value="Technology">Technology</option>
            <option value="Home Services">Home Services</option>
            <option value="Health & Fitness">Health & Fitness</option>
            <option value="Design & Art">Design & Art</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* No skills found */}
      {filteredSkills.length === 0 && (
        <div className="card">
          <p>No skills found.</p>
        </div>
      )}

      {/* List of skills */}
      {filteredSkills.map((s) => (
        <div key={s.id} className="feed-card">
          <div className="feed-header">
            <div>
              <strong>{s.name}</strong> · {s.location}
            </div>
          </div>

          <h3>{s.skill}</h3>
          <p>{s.description}</p>

          <div className="feed-footer">
            {/* Display contact and category */}
            <span className="contact">{s.contact}</span>
            {s.category && (
              <span className="category"> · {s.category}</span>
            )}
          </div>

          <div className="feed-actions">
            <button onClick={() => setSelectedSkill(s)}>🤝 Request</button>
          </div>
        </div>
      ))}

      {/* Request modal */}
      {selectedSkill && (
        <RequestModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </>
  );
}



