import React, { useState, useContext} from "react";
import { sendRecruiterRequest } from "../Context/RecruiterContext";
import  AuthContext from "../Context/AuthContext";

const RecruiterForm = () => {

    const {token} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    companyName: "",
    companyMail: "",
  });
  const [document, setDocument] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
  setDocument(e.target.files[0]);
};
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const data = new FormData();
         data.append("companyName", formData.companyName);
        data.append("companyMail", formData.companyMail);
        data.append("document", document);
       await sendRecruiterRequest(data, token);
       alert("Request sent successfully");
      } catch (err) {
      console.error(err);
      alert("Error sending request");
     }
     };
    return (
     <>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card recruiter-card">
              <div className="card-body">
                <h4 className="mb-4 text-center">Become a Recruiter</h4>
                <p className="text-center text-muted mb-4">
                     Submit your details to start posting jobs 🚀
                </p>
                <form encType="multipart/form-data" onSubmit={submitHandler}  >
                  <div className="form-group">
                    <label>Company Name</label>
                    <input type="text"
                     className="form-control"
                      placeholder="Enter company name"
                      name="companyName" 
                      onChange={handleChange}
                      />
                  </div>
                  <div className="form-group">
                    <label>Company Email</label>
                    <input type="email"
                     className="form-control"
                     name="companyMail"
                     onChange={handleChange}
                     placeholder="Enter company email" />
                  </div>
                  {/* Document Upload */}
                  <div className="form-group">
                    <label>Upload Verification Document</label>
                    <input type="file"
                     name="document"
                    className="form-control"
                    onChange={handleFileChange} />
                    <small className="text-muted">
                       Upload company proof (PDF/Image)
                    </small>
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary px-4" >Submit Request</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterForm;