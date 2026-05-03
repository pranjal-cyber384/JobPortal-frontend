import React, { useContext, useEffect, useState } from "react";
import JobContext from "../Context/JobContext";
import AuthContext from "../Context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const JobListPage = () => {
  const {
    jobs,
    fetchjobs,
    deleteJob,
    page,
    pages,
    searchJobs,
  } = useContext(JobContext);
  const {user} = useContext(AuthContext);
   const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");

  const locationHook = useLocation();

 const params = new URLSearchParams(locationHook.search);

 const keywordQuery = params.get("keyword") || "";
 const locationQuery = params.get("location") || "";
 const categoryQuery = params.get("category") || "";

  
  useEffect(() => {
    if(keywordQuery || locationQuery || categoryQuery) {
      searchJobs({
        keyword: keywordQuery,
        location: locationQuery,
        category: categoryQuery,
      });
    }
    else {
    fetchjobs(1, {});}
  }, [keywordQuery, locationQuery, categoryQuery]);

 

  const handleSearch = () => {
    searchJobs({
      keyword,
      location,
      jobType,
      category,
    });
  };

  const resetFilters = () => {
    setKeyword("");
    setLocation("");
    setJobType("");
    setCategory("");
    fetchjobs(1, {});
  };

  return (
        <div className="container job-page">

      <div className="filter-card">

        <div className="row g-3">

          <div className="col-md-3">

            <input

              className="form-control"

              placeholder="Search job title..."

              value={keyword}

              onChange={(e) => setKeyword(e.target.value)}

            />

          </div>

          <div className="col-md-3">

            <input

              className="form-control"

              placeholder="Location"

              value={location}

              onChange={(e) => setLocation(e.target.value)}

            />

          </div>

          <div className="col-md-3">

            <select

              className="form-control"

              value={jobType}

              onChange={(e) => setJobType(e.target.value)}

               >

              <option value="">All Types</option>

              <option value="full-Time">Full Time</option>

              <option value="part-time">Part Time</option>

              <option value="internship">Internship</option>

              <option value="remote">Remote</option>

            </select>

          </div>

          <div className="col-md-3">

            <select

              className="form-control"

              value={category}

              onChange={(e) => setCategory(e.target.value)}

               >

              <option value="">Categories</option>

              <option value="it-tech">IT & Tech</option>

              <option value="creative-design">Creative Design</option>

              <option value="marketing">Marketing</option>

              <option value="finance">Finance</option>

            </select>

          </div>

          

          <div className="col-md-12 d-flex justify-content-end gap-2">

            <button

              className="btn btn1 btn-primary mr-2"

              onClick={handleSearch}

            >

              Search

            </button>

            <button

              className="btn btn1 btn-secondary"

              onClick={resetFilters}

            >

              Reset

            </button>

          </div>

        </div>

      </div>

      <div className="row">

        {jobs && jobs.length > 0 ? (

          jobs.map((job) => (

            <div className="col-md-6 mb-4" key={job._id}>

              <div className="job-card">

                <div className="job-card-body">

                  <h5>{job.title}</h5>

                  <p className="mb-1">

                    <strong>Company:</strong> {job.companyName}

                  </p>

                  <p className="mb-1">

                    <strong>Location:</strong> {job.location}

                  </p>

                  <p className="mb-1">
                    <span className="job-badge">{job.jobType}</span>
                  </p>
                   <p className="mb-1">
                    <span className="job-badge">{job.category}</span>
                  </p>

                  <h6 className="salary">₹ {job.salary}</h6>

                   <p className="text-muted">

                    {job.description?.substring(0, 100)}...

                  </p>

                  <div className="d-flex justify-content-between">

                    <button

                      className="btn-view"

                      onClick={() => navigate(`/jobs/${job._id}`)}

                      >

                       View

                    </button>
                   {user?.role === "admin" && (
                    <button

                      className="btn-delete"

                      onClick={() => deleteJob(job._id)}

                    >

                      Delete

                    </button>
                      )}
                  </div>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="col-12 text-center">

            <p>No jobs found</p>

          </div>

        )}



      </div>

      <div className="d-flex justify-content-center mt-4">

        <button

          className="btn btn-outline-primary mr-2"

          disabled={page <= 1}

          onClick={() => fetchjobs(page - 1)}

        >

          Prev

        </button>

        <span className="mt-2">

          Page {page} of {pages}

        </span>

        <button

          className="btn btn-outline-primary ml-2"

          disabled={page >= pages}

          onClick={() => fetchjobs(page + 1)}

        >

          Next

        </button>

      </div>

    </div> 
  );
};

export default JobListPage;