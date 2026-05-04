import React, { useContext, useState } from "react";
import JobContext from "../../Context/JobContext";

const CreateJobPage = () => {
  const { addNewJobs, fetchjobs } = useContext(JobContext);

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "full-Time",
    category: "",
    experienceLevel: "entry-level",
    skillsRequired: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewJobs(formData);
      await fetchjobs(1);
      alert("Job created successfully!");
      setFormData({
        title: "",
        companyName: "",
        location: "",
        salary: "",
        jobType: "full-Time",
        category: "it-tech",
        experienceLevel: "entry-level",
        skillsRequired: "",
        description: "",
        deadline: "",
      });
    } catch (err) {
      alert("Failed to create job");
      console.log(err);
    }
  };

  return (
    <div className="form-page fade-in">
      <div className="container"> 
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="form-card">
            
            <div className="card-body">

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    className="form-control"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Job Type</label>
                  <select
                    name="jobType"
                    className="form-control"
                    value={formData.jobType}
                    onChange={handleChange}
                  >
                    <option value="full-Time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>


                <div className="form-group">
                  <label>Categories</label>
                  <select
                    name="category"
                    className="form-control"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="it-tech">IT & Tech</option>
                    <option value="creative-design">Creative Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>



                <div className="form-group">
                  <label>Experience Level</label>
                  <select
                    name="experienceLevel"
                    className="form-control"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                  >
                    <option value="entry-level">Entry Level</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Salary</label>
                  <input
                    type="text"
                    name="salary"
                    className="form-control"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group full">
                  <label>Skills Required</label>
                  <input
                    type="text"
                    name="skillsRequired"
                    className="form-control"
                    value={formData.skillsRequired}
                    onChange={handleChange}
                    placeholder="e.g. React, Node.js, MongoDB"
                    required
                  />
                </div>
                <div className="form-group full">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group full">
                  <label>Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    className="form-control"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </div>
                 <div className="form-actions">
                     <button type="submit" className="btn-submit">
                        Post Job
                     </button>
                 </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateJobPage;