import React, { useContext, useEffect } from "react";
import AdminContext from "../../Context/AdminContext"

const AdminDashboard = () => {
  const { stats, fetchStats } = useContext(AdminContext);
  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Admin Dashboard</h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>Total Users</h5>
            <h3>{stats.totalUser}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>Total Jobs</h5>
            <h3>{stats.totalJob}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>Applications</h5>
            <h3>{stats.totalApplications}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>Recruiters</h5>
            <h3>{stats.recruiter}</h3>
          </div>
        </div>

        <div className="col-md-3 mt-3">
          <div className="card p-3 text-center shadow">
            <h5>Job Seekers</h5>
            <h3>{stats.jobseeker}</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;