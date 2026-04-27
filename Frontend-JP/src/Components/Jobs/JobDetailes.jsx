import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobContext from "../../Context/JobContext";

const JobDetailsPage = () => {
  const {id } = useParams();
  const navigate = useNavigate();

  const { job, fetchJob } = useContext(JobContext);

  useEffect(() => {
    fetchJob(id);
  }, [id]);
    
  if (!job) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border"></div>
      </div>
    );
  }


  return (
    <div className="glass-card p-3 fade-in">

      <div className="card shadow-sm p-4">

        <h2>{job.title}</h2>

        <h5 className="text-muted">{job.companyName}</h5>
        <hr />
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Job Type:</strong> {job.jobType}</p>
        <p><strong>Experience:</strong> {job.experienceLevel}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Skills Required:</strong> {job.skillsRequired}</p>
        <p><strong>Deadline:</strong>{new Date(job.deadline).toLocaleDateString()}</p>
        <hr />
        <p>{job.description}</p>
      
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button
            className="btn btn-primary"
           onClick={() => job?._id && navigate(`/apply/${job._id}`)}
           
          >
            Apply Now
          </button>

          <button
            className="btn btn-warning"
             onClick={() => job?._id && navigate(`/jobs/edit/${job._id}`)}
           >
           Edit Job
          </button>
             
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;