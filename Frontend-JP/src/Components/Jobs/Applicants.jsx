import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApplicationContext from "../../Context/ApplicationContext";

const ApplicantsPage = () => {
  const { jobId } = useParams();
  
console.log("PARAMS:", jobId )
  const {
    applicants,
    fetchApplicants,
    updateStatus,
    loading,
  } = useContext(ApplicationContext);

useEffect(() => {
  if (jobId && jobId !== ":jobId") {
    fetchApplicants(jobId);
  }
}, [jobId]);

 const handleStatus = async (id, action) => {
  try {
    await updateStatus(id, action);

    fetchApplicants(jobId);
     } catch (err) {
    console.error(err);
      }
      };
     

  const getBadge = (status) => {
    if (status === "accepted") return "success";
    if (status === "rejected") return "danger";
    return "warning";
  };

  return (
    <div className="glass-card p-3 fade-in">

      <h3 className="mb-4">
        Applicants ({applicants?.length || 0})
      </h3>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border"></div>
        </div>
      ) : applicants?.length === 0 ? (
        <div className="alert alert-info">
          No applications for this job yet.
        </div>
      ) : (
        <div className="row">

          {applicants.map((applicant) => (
            <div key={applicant._id} className="col-md-6 mb-3">

              <div className="card shadow-sm p-3">

                
                <h5>{applicant.applicant?.name}</h5>
                <p className="text-muted">
                  {applicant.applicant?.email}
                </p>

              
                <span className={`badge bg-${getBadge(applicant.status)} mb-2`}>
                  {applicant.status}
                </span>

              
                <p className="small text-muted">
                  Applied on:{" "}
                  {new Date(applicant.createdAt).toLocaleDateString()}
                </p>

                
                <p>
                  <strong>Cover Letter:</strong>
                </p>
                <p className="small">
                  {applicant.coverLetter}
                </p>

                
                <a
                  href={`http://localhost:3000${applicant.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm mb-2"
                >
                  View Resume
                </a>

                
                <div className="d-flex justify-content-between mt-2">
                   <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleStatus(applicant._id, "approve")}
                    >
                     Accept
                    </button>

                    <button
                    className="btn btn-danger btn-sm"
                      onClick={() => handleStatus(applicant._id, "reject")}
                      >
                       Reject
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

export default ApplicantsPage;