import axios from "axios"; 

const API = axios.create({
  baseURL: "http://localhost:8080",
});

/* ---------------- AUTH ---------------- */

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const updateProfile = async (id, data) => {
  const res = await API.put(`/auth/profile/${id}`, data);
  return res.data;
};

/* ---------------- SKILLS ---------------- */

export const getSkills = async () => {
  const res = await API.get("/skills");
  return res.data;
};

export const addSkill = async (data) => {
  const res = await API.post("/skills", data);
  return res.data;
};

/* ---------------- REQUESTS ---------------- */

export const sendRequest = async (data) => {
  const res = await API.post("/requests", data);
  return res.data;
};

export const getMyRequests = async (email) => {
  const res = await API.get(`/requests/my?email=${email}`);
  return res.data;
};

/* ✅ NEW: Received Requests */
export const getReceivedRequests = async (email) => {
  const res = await API.get(`/requests/received?email=${email}`);
  return res.data;
};

/* ✅ FIXED: Accept Request */
export const acceptRequest = async (id, message) => {
  const res = await API.put(
    `/requests/${id}/accept`,
    { responseMessage: message }, // ✅ send as JSON
    { headers: { "Content-Type": "application/json" } } // ✅ correct header
  );
  return res.data;
};

/* ✅ FIXED: Reject Request */
export const rejectRequest = async (id, message) => {
  const res = await API.put(
    `/requests/${id}/reject`,
    { responseMessage: message }, // ✅ send as JSON
    { headers: { "Content-Type": "application/json" } } // ✅ correct header
  );
  return res.data;
};


