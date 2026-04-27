import React, { useContext, useEffect, useState } from "react";
import JobContext from "../Context/JobContext";
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
   const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const locationHook = useLocation();

 const params = new URLSearchParams(locationHook.search);

 const keywordQuery = params.get("keyword") || "";
 const locationQuery = params.get("location") || "";

  
  useEffect(() => {
    if(keywordQuery || locationQuery) {
      searchJobs({
        keyword: keywordQuery,
        location: locationQuery,
      });
    }
    else {
    fetchjobs(1, {});}
  }, [keywordQuery, locationQuery]);

 

  const handleSearch = () => {
    searchJobs({
      keyword,
      location,
      jobType,
    });
  };

  const resetFilters = () => {
    setKeyword("");
    setLocation("");
    setJobType("");
    fetchjobs(1, {});
  };

  return (
        <div className="container mt-4">

      <div className="card p-3 mb-4 shadow-sm">

        <div className="row">

          <div className="col-md-4">

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

          <div className="col-md-2 d-flex">

            <button

              className="btn btn1 btn-primary btn-block mr-2"

              onClick={handleSearch}

            >

              Search

            </button>

            <button

              className="btn btn1 btn-secondary btn-block"

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

              <div className="card shadow-sm h-100">

                <div className="card-body">

                  <h5>{job.title}</h5>

                  <p className="mb-1">

                    <strong>Company:</strong> {job.companyName}

                  </p>

                  <p className="mb-1">

                    <strong>Location:</strong> {job.location}

                  </p>

                  <p className="mb-1">

                    <strong>Type:</strong> {job.jobType}

                  </p>

                  <p className="mb-2">

                    <strong>Salary:</strong> {job.salary}

                  </p>

                   <p className="text-muted">

                    {job.description?.substring(0, 100)}...

                  </p>

                  <div className="d-flex justify-content-between">

                    <button

                      className="btn btn-sm btn-info"

                      onClick={() => navigate(`/jobs/${job._id}`)}

                      >

                       View

                    </button>

                    <button

                      className="btn btn-sm btn-danger"

                      onClick={() => deleteJob(job._id)}

                    >

                      Delete

                    </button>

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