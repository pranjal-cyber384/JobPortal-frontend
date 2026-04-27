import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationContext from "../Context/ApplicationContext";

const MyApplicationsPage = () => {
  const { applications, fetchMyApplications, loading } =
    useContext(ApplicationContext);
    console.log("APPLICATIONS STATE:", applications);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMyApplications();
  }, []);
  const getStatusBadge = (status) => {
    if (status === "accepted") return "success";
    if (status === "rejected") return "danger";
    return "warning";
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4">My Applications</h3>
        {loading ? (
        <div className="text-center">
          <div className="spinner-border"></div>
        </div>
          ) : applications.length === 0 ? (
        <div className="alert alert-info">
          You haven't applied to any jobs yet.
        </div>
          ) : (
        <div className="row">
          {applications.map((applicant) => (
            <div key={applicant._id} className="col-md-6 mb-3">
              <div className="card shadow-sm p-3">
                <h5>{applicant.job?.title}</h5>
                <p className="text-muted">{applicant.job?.companyName}</p>
                <p>
                  <strong>Location:</strong> {applicant.job?.location}
                </p>
                <span className={`badge bg-${getStatusBadge(applicant.status)} mb-2`}>
                  {applicant.status}
                </span>
                <p className="small text-muted">
                  Applied on: {new Date(applicant.createdAt).toLocaleDateString()}
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/jobs/${applicant.job?._id}`)}
                  >
                    View Job
                  </button>

                  <a
                    href={`http://localhost:3000${applicant.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplicationsPage;