import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobContext from "../../Context/JobContext";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("PARAM ID:", id);

  const { job, fetchJob, editJob } = useContext(JobContext);

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    skillsRequired: "",
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadJob = async () => {
      await fetchJob(id);
    };

    loadJob();
  }, [id]);

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        companyName: job.companyName || "",
        location: job.location || "",
        salary: job.salary || "",
        jobType: job.jobType || "",
        description: job.description || "",
        skillsRequired: job.skillsRequired || "",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!id) {
    console.error("ID missing");
    return;
  }

  setLoading(true);

  try {
    const cleanData = {
      title: formData.title,
      companyName: formData.companyName,
      location: formData.location,
      salary: formData.salary,
      jobType: formData.jobType,
      description: formData.description,
      skillsRequired: formData.skillsRequired,
    };

    console.log("EDIT ID:", id);
    console.log("EDIT DATA:", cleanData);

    await editJob(id, cleanData);

    navigate(`/jobs/${id}`);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="glass-card p-3 fade-in">

      <div className="card shadow-sm p-4">

        <h3 className="mb-3">Edit Job</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
          />

          <select
            className="form-control mb-2"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="full-Time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>

          <input
            className="form-control mb-2"
            name="skillsRequired"
            placeholder="Skills Required"
            value={formData.skillsRequired}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            name="description"
            rows="5"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="d-flex justify-content-between">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Job"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditJobPage;