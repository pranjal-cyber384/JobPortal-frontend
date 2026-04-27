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
    <div className="container mt-5">
      <h4 className="mb-4">Recruiter Requests</h4>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
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
                  <tr key={req._id}>
                    <td>{index + 1}</td>
                    <td>{req.user?.name || "N/A"}</td>
                    <td>{req.companyName}</td>
                    <td>{req.companyMail}</td>
                    <td>
                      {req.document ? (
                        <a
                          href={req.document}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-info"
                        >
                          View
                        </a>
                      ) : (
                        "No File"
                      )}
                    </td>
                    
                    <td>
                      <span
                        className={`badge ${
                          req.status === "approved"
                            ? "badge-success"
                            : req.status === "rejected"
                            ? "badge-danger"
                            : "badge-warning"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-success btn-sm mr-2"
                        onClick={() => handleApprove(req._id)}
                        disabled={req.status === "approved"}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleReject(req._id)}
                        disabled={req.status === "rejected"}
                      >
                        Reject
                      </button>
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
  );
};

export default RecruiterRequests;