import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../Context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
     const { user, token, fetchProfile } = useContext(AuthContext);
     console.log("TOKEN:", token);
     console.log("USER:", user);
     const [error, setError] = useState("");
     console.log(user);

     useEffect(() => {
     if (!user && token) {
      fetchProfile().catch((err) => {
        setError(err.response?.data?.message || "Failed to load profile");
      });
     }
    
      }, [user, token]);

  
     return (
             <>
             <div className="container mt-5">
             <div className="row">
            {error ? <div className="alert alert-danger">{error}</div> : null}
            <div className="col-lg-4 col-md-5 mb-4">
             <div className="card profile-card text-center">
              <div className="card-body">
                <img
                  src={`http://localhost:3000${user?.profileImage}`}
                  alt="profile"
                  className="profile-img mb-3"
                />
                <h5>{user?.name}</h5>
                <p className="text-muted">{user?.post}</p>
                <p className="mb-4">{user?.companyName}</p>
                    <Link to="/edit/profile">
                     <button className="btn btn-outline-primary btn-block">
                      Edit Profile
                      </button>
                    </Link>
               </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-7">
            <div className="card profile-card">
              <div className="card-body">
                <h5 className="profile-details-title">Profile Details</h5>

                  <div className="profile-row row">
                   <div className="col-sm-4 profile-label">Name</div>
                   <div className="col-sm-8 profile-value">{user?.name}</div>
                  </div>

                 <div className="profile-row row">
                   <div className="col-sm-4 profile-label">Email</div>
                   <div className="col-sm-8 profile-value">{user?.email}</div>
                 </div>

                 <div className="profile-row row">
                   <div className="col-sm-4 profile-label">Role</div>
                   <div className="col-sm-8 profile-value">{user?.role}</div>
                 </div>

                 <div className="profile-row row">
                    <div className="col-sm-4 profile-label">Skills</div>
                    <div className="col-sm-8 profile-value">{user?.skills}</div>
                 </div>

                  <div className="profile-row row">
                    <div className="col-sm-4 profile-label">Experience</div>
                  <div className="col-sm-8 profile-value">{user?.experience}</div>
                  </div>

                  <div className="profile-row row">
                    <div className="col-sm-4 profile-label">Resume</div>
                    <div className="col-sm-8">
                       {user?.resume ? (
                     <button
                      className="btn-resume"
                      onClick={() =>
                      window.open(`${import.meta.env.VITE_API_BASE_URL}${user?.resume}`, "_blank")
                             }
                            >
                      View Resume
                    </button>
                     ) : (
                    <span className="text-muted">No Resume</span>
                   )}
                </div>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
   
  );
};

export default Profile;
