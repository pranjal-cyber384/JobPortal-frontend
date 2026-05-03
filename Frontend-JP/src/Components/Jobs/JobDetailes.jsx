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
    <div className="job-details-page fade-in">
  <div className="job-details-card">

       <div className="job-header">
         <h2>{job.title}</h2>
         <h5 className="company">{job.companyName}</h5>

        <div className="job-meta">
          <span>{job.location}</span>
          <span>{job.jobType}</span>
           <span>{job.category}</span>
          <span>{job.experienceLevel}</span>
        </div>

        <h4 className="salary">₹ {job.salary}</h4>
      </div>
        <div className="job-info">
             <div className="skills">
                 {job.skillsRequired?.split(",").map((skill, i) => (
                 <span key={i}>{skill}</span>
                ))}
        </div>
         <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
       </div>

        <div className="job-description">
         <h5>Job Description</h5>
         <p>{job.description}</p>
       </div>
        <div className="job-actions">
          <button className="btn-back" onClick={() => navigate(-1)}>Back</button>

          <button
            className="btn-apply"
              onClick={() => job?._id && navigate(`/apply/${job._id}`)}
             >
              Apply Now
          </button>
       </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;