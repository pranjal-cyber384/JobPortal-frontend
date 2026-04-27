import React from "react";
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Components/Navbar";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile"
import EditProfile from "./Pages/EditProfile";
import RecruiterForm from "./Pages/RecruiterForm";
import RecruiterRequests from "./Pages/Admin/RecruiterRequest";
import CreateJobPage from "./Components/Jobs/JobForm"
import JobListPage from "./Pages/JobList"
import JobDetailes from "./Components/Jobs/JobDetailes"
import EditJobPage from "./Components/Jobs/EditJobPage";
import PostedJobsPage from "./Components/Jobs/PostedJobs";
import ApplyJobPage from "./Pages/ApplyJob";
import MyApplicationsPage from "./Pages/AppliedJob";
import ApplicantsPage from "./Components/Jobs/Applicants";
import AdminDashboard from "./Pages/Admin/Dashboard";
import UsersPage from "./Pages/Admin/AllUsers";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Footer from "./Components/Footer";
import "./App.css"
const App = () => {
   return (
    <>
  
      <Nav />

      <main className="app-shell">
        <div className="page-wrapper">
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/user/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit/profile" element={<EditProfile/>} />
          <Route path="/recruiter/form" element={<RecruiterForm/>} />


          <Route path="/admin/request" element={
            <ProtectedRoute>
            <RecruiterRequests/>
            </ProtectedRoute>
            } />


           <Route path="/jobs" element={
            <ProtectedRoute>
            <CreateJobPage/>
            </ProtectedRoute>
            } />
           <Route path="/all/jobs" element={<JobListPage/>} />
           <Route path="/jobs/:id" element={<JobDetailes />} />

           <Route path="/jobs/edit/:id" element={
            <ProtectedRoute>
            <EditJobPage />
            </ProtectedRoute>
            } />
           <Route path="/recruiter/jobs" element={
            <ProtectedRoute>
            <PostedJobsPage />
            </ProtectedRoute>
          } />

            <Route path="/apply/:id" element={
              <ProtectedRoute>
              <ApplyJobPage />
              </ProtectedRoute>
              } />
            <Route path="/my-applications" element={<MyApplicationsPage />} />
            <Route path="/recruiter/applicants/:jobId" element={<ApplicantsPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersPage />} />
        </Routes>
        </div>
      </main>
       


      <Footer/>
    </>
   )
};
export default App;
 
  


