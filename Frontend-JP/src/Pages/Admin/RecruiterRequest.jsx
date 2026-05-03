import React, { useEffect, useState, useContext } from "react";
import {
  getAllRequests,
  approveRequest,
  rejectRequest,
} from "../../Context/RecruiterContext";
import AuthContext from "../../Context/AuthContext";

const RecruiterRequests = () => {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await getAllRequests(token);
      setRequests(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRequests();
    }
  }, [token]);

  const handleApprove = async (id) => {
    try {
      await approveRequest(id, token);
      fetchRequests();
    } catch (err) {
      console.error("Approve Error:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id, token);
      fetchRequests();
    } catch (err) {
      console.error("Reject Error:", err);
    }
  };
  return (
  <div className="admin-page fade-in">

    {/* HEADER */}
    <div className="admin-header">
      <h3>Recruiter Requests</h3>
    </div>

    <div className="admin-card">

      {loading ? (
        <div className="text-center">
          <div className="spinner-border"></div>
        </div>
      ) : (
        <div className="table-responsive">

          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Document</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.length > 0 ? (
                requests.map((req, index) => (
                  <tr
                    key={req._id}
                    className={`status-${req.status}-row`}
                  >
                    <td>{index + 1}</td>

                    <td>{req.user?.name || "N/A"}</td>

                    <td>{req.companyName}</td>

                    <td>{req.companyMail}</td>

                    <td>
                      {req.document ? (
                        <button
                          className="btn-view-doc"
                          onClick={() =>
                            window.open(
                              `${import.meta.env.VITE_API_BASE_URL}${req.document}`,
                              "_blank"
                            )
                          }
                        >
                          View
                        </button>
                      ) : (
                        <span className="text-muted small">
                          No File
                        </span>
                      )}
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`status-badge ${
                          req.status === "approved"
                            ? "status-approved"
                            : req.status === "rejected"
                            ? "status-rejected"
                            : "status-pending"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-approve"
                          onClick={() => handleApprove(req._id)}
                          disabled={req.status === "approved"}
                        >
                          Approve
                        </button>

                        <button
                          className="btn-reject"
                          onClick={() => handleReject(req._id)}
                          disabled={req.status === "rejected"}
                        >
                          Reject
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Requests Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      )}
    </div>
  </div>
);
  
};

export default RecruiterRequests;