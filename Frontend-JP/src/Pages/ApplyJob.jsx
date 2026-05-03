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
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
    setFileName(e.target.files[0]?.name);
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
    <div className="apply-page fade-in">
      <div className="apply-card">
        <h3 className="mb-2">Apply for Job</h3>
         <p className="text-muted mb-4">
        Submit your application and stand out to recruiters 🚀
        </p>
        <form onSubmit={handleSubmit}>
           <div className="form-group">
            <label>Cover Letter</label>
          <textarea
            className="form-control custom-textarea"
            name="coverLetter"
            rows="5"
            placeholder="Write your cover letter..."
            value={formData.coverLetter}
            onChange={handleChange}
            required
          />
          </div>
            <div className="form-group mt-3">
          <label>Upload Resume</label>

          <div className="file-upload-box">
            <input
              type="file"
              onChange={handleFileChange}
              required
            />
            <span> {fileName ? fileName : "📄 Choose your resume (PDF)"}</span>
             </div>
            </div>
          
          <button
            type="submit"
            className="btn-apply1 mt-4"
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