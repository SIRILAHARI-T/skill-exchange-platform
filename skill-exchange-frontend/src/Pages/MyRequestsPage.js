import React, { useEffect, useState } from "react";
import {
  getMyRequests,
  getReceivedRequests,
  acceptRequest,
  rejectRequest,
} from "../api";

const MyRequestsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    getMyRequests(user.email).then(setSent);
    getReceivedRequests(user.email).then(setReceived);
  }, [user]);

  const handleAccept = async (id) => {
    await acceptRequest(id, responseText || "Accepted ✅");
    getReceivedRequests(user.email).then(setReceived);
  };

  const handleReject = async (id) => {
    await rejectRequest(id, responseText || "Rejected ❌");
    getReceivedRequests(user.email).then(setReceived);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Requests</h2>

      {/* SENT */}
      <h3>📤 Sent Requests</h3>
      {sent.length === 0 && <p>No requests sent.</p>}
      {sent.map((r) => (
        <div key={r.id} className="feed-card">
          <p><b>Message:</b> {r.message}</p>
          <p><b>Status:</b> {r.status}</p>
          {r.responseMessage && (
            <p><b>Response:</b> {r.responseMessage}</p>
          )}

          {/* Show who accepted your request */}
          {r.status === "ACCEPTED" && r.receiverEmail && (
            <p><b>Accepted By:</b> {r.receiverEmail}</p>
          )}
        </div>
      ))}

      {/* RECEIVED */}
      <h3 style={{ marginTop: "30px" }}>📥 Received Requests</h3>
      {received.length === 0 && <p>No incoming requests.</p>}

      {received.map((r) => (
        <div key={r.id} className="feed-card">
          <p><b>From:</b> {r.requesterName}</p>
          <p><b>Email:</b> {r.requesterEmail}</p>
          <p><b>Message:</b> {r.message}</p>
          <p><b>Status:</b> {r.status}</p>

          {r.status === "PENDING" && (
            <>
              <textarea
                placeholder="Response message (optional)"
                onChange={(e) => setResponseText(e.target.value)}
              />
              <button onClick={() => handleAccept(r.id)}>✅ Accept</button>
              <button onClick={() => handleReject(r.id)}>❌ Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyRequestsPage;



