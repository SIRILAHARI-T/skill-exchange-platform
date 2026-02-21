import { FaHome, FaSearch, FaPlusSquare, FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear logged-in user
    navigate("/login");               // Redirect to login page
    window.location.reload();         // Optional: force reload to reset state
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>SkillX</h2>

        <NavLink to="/" end className="nav-link">
          <FaHome /> Feed
        </NavLink>

        <NavLink to="/discover" className="nav-link">
          <FaSearch /> Discover
        </NavLink>

        <NavLink to="/add" className="nav-link">
          <FaPlusSquare /> Add Skill
        </NavLink>

        <NavLink to="/profile" className="nav-link">
          <FaUser /> Profile
        </NavLink>

        <NavLink to="/my-requests" className="nav-link">
          <FaEnvelope /> My Requests
        </NavLink>

        {/* ✅ Logout Button */}
        <button onClick={handleLogout} className="nav-link logout-button">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

