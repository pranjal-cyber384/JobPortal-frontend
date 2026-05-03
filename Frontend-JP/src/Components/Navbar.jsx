import React, {useContext} from "react";
import AuthContext from "../Context/AuthContext";
import { Link,useNavigate, Navigate } from "react-router-dom";


const Nav = () => {
  const navigate = useNavigate();
   const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
   };

  const { user, isAuthenticated ,logout} = useContext(AuthContext);
   console.log("USER:", user);
    return (
  <nav  className="navbar navbar-expand-lg navbar-modern fixed-top">
  <div className="container">
     <Link className= "navbar-brand font-weight-bold" to="/">
          <strong>JobPortal</strong>
        </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarContent">
      <ul className="navbar-nav mr-auto" id="navLinks">
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
      
      <li className="nav-item"><Link class="nav-link" to="/recruiter/jobs">My Jobs</Link></li>
      <li className="nav-item"><Link class="nav-link" to="/jobs">Post Job</Link></li>
      <li className="nav-item"><Link class="nav-link" to="/profile">Profile</Link></li>
     
        </>
        )}

        { user?.role === "admin" && (
          <>
      <li className="nav-item"><Link class="nav-link active" to="/admin/dashboard">Dashboard</Link></li>
      <li className="nav-item"><Link class="nav-link" to="/admin/users">Users</Link></li>
      <li className="nav-item"><Link class="nav-link"  to="/admin/request">Requests</Link></li>
     
      </>
        )}
        </>
       </ul>

      
      <ul className="navbar-nav">

        {!isAuthenticated && (
        <li className="nav-item">
          
          <Link className="btn btn-primary login-btn" to="/login">Login</Link>
          <Link className="btn btn-primary logout-btn mx-4" to="/user/register">Register</Link>
        </li>
        )}
         {isAuthenticated && (
        <li className="nav-item">
          
           <button className="btn btn-primary logout-btn mx-4"
            onClick={handleLogout}>Logout</button>
        </li>
        )}
      </ul>
    </div>
  </div>
</nav>
    )
};

export default Nav;