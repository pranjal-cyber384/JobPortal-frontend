import React, { useContext, useEffect, useReducer, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  skills: "",
  phone: "",
  education: "",
  experience: "",
  companyName: "",
  post: "",
  profileImage: null,
  resume: null,
};

const profileReducer = (state, action) => {
  if (action.type === "LOAD") {
  if (!action.payload) return state;
    return {
      ...state,
      name: action.payload.name || "",
      email: action.payload.email || "",
      password: "",
      skills: action.payload.skills || "",
      phone: action.payload.phone || "",
      education: action.payload.education || "",
      experience: action.payload.experience || "",
      companyName: action.payload.companyName || "",
      post: action.payload.post
    };
  }
   if (
    action.type === "name" ||
    action.type === "email" ||
    action.type === "password" ||
    action.type === "skills" ||
    action.type === "phone"  ||
    action.type === "education" ||
    action.type === "experience" ||
    action.type === "companyName" ||
    action.type === "post" ||
    action.type === "profileImage" ||
    action.type === "resume"
  ) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }

  return state;
};


const EditProfile = () => {

    const [state, dispatch] = useReducer(profileReducer, initialState);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, fetchProfile, updateProfile } = useContext(AuthContext);
    const navigate = useNavigate();
   useEffect(() => {
    if (user) {
      dispatch({ type: "LOAD", payload: user });
    } else {
      fetchProfile()
        .then((data) => {
          dispatch({ type: "LOAD", payload: data.user });
        })
        .catch((err) => {
          setError(err.response?.data?.message || "Failed to load profile");
        });
    }
  }, []);

    const [fileName, setFileName] = useState("");
    const changeHandler = (e) => {
    const { name, value, files } = e.target;

      if (files && files.length > 0) {
    setFileName(files[0].name);

    dispatch({
      type: name,
      payload: files[0],
    });
   } else {
    setFileName("");

    dispatch({
      type: name,
      payload: value,
    });
     }
    };

   const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("email", state.email);
      formData.append("skills", state.skills);
      formData.append("phone", state.phone);
      formData.append("education", state.education);
      formData.append("experience", state.experience);
      formData.append("companyName", state.companyName);
      formData.append("post", state.post);
      if (state.password.trim()) {
        formData.append("password", state.password.trim());
      }
      if (state.profileImage) {
        formData.append("profileImage", state.profileImage);
      }

      if (state.resume) {
        formData.append("resume", state.resume);
      }

      await updateProfile(formData);
      setSuccess("Profile updated successfully");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
    };
  return (
    <>
      <div className="profile-page fade-in">
         <div className="profile-container">
            <div className="profile-card">
              <div className="card-body">
                <h4 className="mb-4">Edit Profile</h4>
                {error ? <div className="alert alert-danger">{error}</div> : null}
                {success ? <div className="alert alert-success">{success}</div> : null}
                <form encType="multipart/form-data" onSubmit={submitHandler}>
                  {/* Profile Image */}
                  <div className="profile-image-section">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${user?.profileImage}`}
                      alt="profileImage"
                      className="profile-img mb-3"
                    />
                    <div  className="file-upload-box small">
                      <input type="file"
                      name="profileImage"
                      className="form-control-file"
                      onChange={changeHandler} />
                       <span> {fileName ? fileName : "Choose your Profile Image"}</span>
                    </div>
                  </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text"
                     className="form-control"
                      placeholder="Enter name"
                      name="name"
                      value={state.name}
                      onChange={changeHandler}
                      required />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={state.email} 
                    onChange={changeHandler}
                    required
                    />
                  </div>
                   <div className="form-group">
                    <label>Password</label>
                    <input type="password"
                     className="form-control"
                     placeholder="update password"
                     name="password"
                     value={state.password}
                     onChange={changeHandler} />
                   </div>

                   <div className="form-group">
                    <label>Phone</label>
                    <input type="text"
                     className="form-control"
                     name="phone"
                     value={state.phone} 
                     onChange={changeHandler}
                     required />
                  </div>
                </div>
                   
                  <div className="form-grid mt-3">
                   <div className="form-group">
                    <label>Skills</label>
                    <input type="text"
                     className="form-control"
                     placeholder="e.g. React, Node, MongoDB" 
                     name="skills"
                     value={state.skills}
                     onChange={changeHandler}
                     required
                      />
                   </div>

                   <div className="form-group">
                    <label>Education</label>
                    <input type="text"
                     className="form-control"
                     name="education"
                     value={state.education}
                     onChange={changeHandler}     
                     />
                  </div>

                   <div className="form-group">
                    <label>Experience</label>
                    <input type="text"
                     className="form-control"
                     name="experience"
                     value={state.experience} 
                     onChange={changeHandler}
                     />
                  </div>
               
                   <div className="form-group">
                    <label>Company Name</label>
                    <input type="text"
                     className="form-control"
                     name="companyName"
                     value={state.companyName}
                     onChange={changeHandler} 
                      />
                  </div>

                   <div className="form-group">
                    <label>Post</label>
                    <input type="text"
                     className="form-control"
                     name="post"
                     value={state.post} 
                     onChange={changeHandler}/>
                  </div>
                 </div>
                  <div className="mt-3">
                    <label>Upload Resume</label>
                    <div className="file-upload-box small">
                    <input type="file"
                           name= "resume"
                          className="form-control-file"
                          onChange={changeHandler} />
                         <span> {fileName ? fileName : "📄 Choose your resume (PDF)"}</span>
                     </div>
                  </div>

                  <div className="profile-actions">
                    <button
                         type="button"
                         className="btn-cancel"
                         onClick={() => navigate(-1)}
                         >
                          Cancel
                    </button>
                    <button
                        type="submit"
                         className="btn-save"
                         disabled={loading}
                         >
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                  </div>
                 
                </form>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default EditProfile;