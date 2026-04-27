
import api from "../service/api";
export const sendRecruiterRequest = async (payload, token) => {
  return api.post("/api/recruiter/recruiter/apply", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllRequests = async (token) => {
  return api.get("/api/recruiter/requests", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const approveRequest = async (id, token) => {
  return api.patch(`/api/recruiter/request/${id}`, {action: "approve"}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const rejectRequest = async (id, token) => {
  return api.patch(`/api/recruiter/request/${id}`, {action: "reject"}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


