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
  // const getStatusBadge = (status) => {
  //   if (status === "accepted") return "success";
  //   if (status === "rejected") return "danger";
  //   return "warning";
  // };


  return (
    <div className="applications-page fade-in">

      <h3 className="mb-4">My Applications</h3>
        {loading ? (
        <div className="text-center">
          <div className="spinner-border"></div>
        </div>
          ) : applications.length === 0 ? (
        <div className="empty-state">
          You haven't applied to any jobs yet.
        </div>
          ) : (
        <div className="row g-4">
          {applications.filter(applicant => applicant.job)
          .map((applicant) =>
          (
            <div key={applicant._id} className="col-lg-6 col-md-12">
              <div className="application-card">
                <div>
                <h5>{applicant.job?.title}</h5>
                <p className="company">{applicant.job?.companyName}</p>
                <p className="location">
                  <strong>Location:</strong>📍{applicant.job?.location} 
                </p>
                <span
                  className={`status-badge ${
                   (applicant.status) === "accepted"
                      ? "status-accepted"
                      : applicant.status === "rejected"
                      ? "status-rejected"
                      : "status-pending"
                  }`}
                >
                  {applicant.status}
                </span>

                <p className="date">
                  Applied on:{" "}
                  {new Date(applicant.createdAt).toLocaleDateString()}
                </p>
                </div>
                <div className="application-actions">
                  <button
                    className="btn-view"
                    onClick={() => navigate(`/jobs/${applicant.job?._id}`)}
                  >
                    View Job
                  </button>
                     <button
                       className="btn-resume"
                        onClick={() =>
                            window.open(
                          `${import.meta.env.VITE_API_BASE_URL}${applicant.resume}`,
                          "_blank"
                          )
                           }
                        >
                          Resume
                      </button>
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