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
            <div className="col-md-4">
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
          <div className="col-md-8">
            <div className="card profile-card">
              <div className="card-body">
                <h5 className="mb-4">Profile Details</h5>
                <div className="row mb-3">
                  <div className="col-sm-4"><strong>Name</strong></div>
                  <div className="col-sm-8">{user?.name}</div>
                   </div>
                   <div className="row mb-3">
                    <div className="col-sm-4"><strong>Email</strong></div>
                   <div className="col-sm-8">{user?.email}</div>
                   </div>
                   <div className="row mb-3">
                   <div className="col-sm-4"><strong>Role</strong></div>
                   <div className="col-sm-8">{user?.role}</div>
                   </div>
                   <div className="row mb-3">
                   <div className="col-sm-4"><strong>Skills</strong></div>
                   <div className="col-sm-8">{user?.skills}</div>
                   </div>
                   <div className="row mb-3">
                   <div className="col-sm-4"><strong>Experience</strong></div>
                   <div className="col-sm-8">{user?.experience}</div>
                   </div>

                   <div className="row mb-3">
                   <div className="col-sm-4"><strong>
                    Resume</strong>
                    </div>
                   {user?.resume ? (
                    <div className="col-sm-8">
                    <a href= {`http://localhost:3000${user?.resume}`} target="_blank">
                    <button className="btn btn-sm btn-primary">
                      View Resume
                    </button>
                    </a>
                   </div>
                    ) : (
                   "No Resume Uploaded"
                    )}
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
