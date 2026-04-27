import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobContext from "../../Context/JobContext";

const PostedJobsPage = () => {
  const { jobs, fetchMyJobs, deleteJob, pages } = useContext(JobContext);
  

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyJobs(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Posted Jobs</h3>
      {jobs.length === 0 ? (
        <div className="alert alert-info">
          No jobs posted yet
        </div>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <div key={job._id} className="col-md-6 mb-3">
              <div className="card shadow-sm p-3">
                <h5>{job.title}</h5>
                <p className="text-muted">{job.companyName}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.jobType}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/jobs/${job._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => navigate(`/jobs/edit/${job._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteJob(job._id)}
                  >
                    Delete
                  </button>

                   <button
                  className="btn btn-info btn-sm"
                 
                  onClick={() => navigate(`/recruiter/applicants/${job._id}`)}
                  >
                  Applicants
                  </button>                 
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {pages > 1 && (
        <div className="d-flex justify-content-center mt-4">

          <button
            className="btn btn-outline-primary mx-1"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
          {[...Array(pages)].map((_, i) => (
            <button
              key={i}
              className={`btn mx-1 ${
                currentPage === i + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-outline-primary mx-1"
            disabled={currentPage === pages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PostedJobsPage;