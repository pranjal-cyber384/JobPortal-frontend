import React, { useContext, useEffect } from "react";
import AdminContext from "../../Context/AdminContext"

const AdminDashboard = () => {
  const { stats, fetchStats } = useContext(AdminContext);
  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border"></div>
    </div>
     );
    }
  return (
    <div className="admin-dashboard fade-in">
      <h3 className="dashboard-title">Admin Dashboard</h3>
      <div className="stats-grid">
    <div className="stat-card">
      <p>👥 Total Users</p>
      <h2>{stats.totalUser}</h2>
     </div>

    <div className="stat-card">
      <p>💼 Total Jobs</p>
      <h2>{stats.totalJob}</h2>
    </div>

     <div className="stat-card">
      <p>📄 Applications</p>
      <h2>{stats.totalApplications}</h2>
     </div>

      <div className="stat-card">
        <p>🏢 Recruiters</p>
       <h2>{stats.recruiter}</h2>
      </div>

      <div className="stat-card">
        <p>🧑‍💻 Job Seekers</p>
        <h2>{stats.jobseeker}</h2>
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;