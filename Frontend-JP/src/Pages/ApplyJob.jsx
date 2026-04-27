import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApplicationContext from "../Context/ApplicationContext";

const ApplyJobPage = () => {
  const { id } = useParams();
   console.log("APPLY JOB ID:", id);
  const navigate = useNavigate();
  const { applyJob, loading } = useContext(ApplicationContext);
  const [formData, setFormData] = useState({
    coverLetter: "",
  });
  const [resume, setResume] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("coverLetter", formData.coverLetter);
      data.append("resume", resume);
      await applyJob(id, data);
      alert("Application submitted successfully");
      navigate("/my-applications");
    } catch (err) {
      alert(err.response?.data?.message || "Error applying");
    }
  };
  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h3 className="mb-3">Apply for Job</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-3"
            name="coverLetter"
            rows="5"
            placeholder="Write your cover letter..."
            value={formData.coverLetter}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            className="form-control mb-3"
            onChange={handleFileChange}
            required
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Applying..." : "Apply"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobPage;