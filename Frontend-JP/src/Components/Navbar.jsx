import React, {useContext} from "react";
import AuthContext from "../Context/AuthContext";
import { Link, Navigate } from "react-router-dom";


const Nav = () => {
  const { user, isAuthenticated ,logout} = useContext(AuthContext);
   console.log("USER:", user);
    return (
<nav  className="navbar navbar-expand-lg navbar-modern">
  <div class="container">
     <Link className= "navbar-brand font-weight-bold" to="/">
          <strong>JobPortal</strong>
        </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarContent">
      <ul class="navbar-nav mr-auto" id="navLinks">
      <li className="nav-item"><Link class="nav-link active" to="/">Home</Link></li>
      <li className="nav-item"><Link class="nav-link" to="/all/jobs">Jobs</Link></li>
        <>
        {user?.role === "jobseeker" && (
          <>
       <li className="nav-item"><Link class="nav-link" to="/my-applications">Applied Jobs</Link></li>
       <li className="nav-item"><Link class="nav-link" to="/profile">Profile</Link></li>
      <li className="nav-item"><Link class="nav-link" to="/recruiter/form">Became Recruiter</Link></li>
      
         </>
        )}
        { user?.role === "recruiter" && (
            <>
      
      <li class="nav-item"><Link class="nav-link" to="/recruiter/jobs">My Jobs</Link></li>
      <li class="nav-item"><Link class="nav-link" to="/jobs">Post Job</Link></li>
      <li class="nav-item"><Link class="nav-link" to="/profile">Profile</Link></li>
     
        </>
        )}

        { user?.role === "admin" && (
          <>
      <li class="nav-item"><Link class="nav-link active" to="/admin/dashboard">Dashboard</Link></li>
      <li class="nav-item"><Link class="nav-link" to="/admin/users">Users</Link></li>
      <li class="nav-item"><Link class="nav-link"  to="/admin/request">Requests</Link></li>
     
      </>
        )}
        </>
       </ul>

      
      <ul class="navbar-nav">
        {!isAuthenticated && (
        <li class="nav-item">
          
          <Link class="btn btn-primary login-btn" to="/login">Login</Link>
          <Link class="btn btn-primary logout-btn mx-4" to="/user/register">Register</Link>
        </li>
        )}
         {isAuthenticated && (
        <li class="nav-item">
          
           <Link class="btn btn-primary logout-btn mx-4" onClick={logout}>Logout</Link>
        </li>
        )}
        
      </ul>
        
         

    </div>
  </div>
</nav>
    )
};

export default Nav;