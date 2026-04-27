import React, {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    };
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white custom-navbar">
        <div className="container">
          <a className="navbar-brand" href="#">JobPortal</a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="auth-container d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card auth-card">
                <div className="card-body">
                  <h3 className="text-center mb-4">Register</h3>
                    {error ? <div className="alert alert-danger">{error}</div> : null}
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        onChange={changeHandler}
                        value={form.name}
                        required
                        />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                        <input
                         className="form-control"
                         type="email"
                         name="email"
                         placeholder="Enter email address"
                         onChange={changeHandler}
                         value={form.email}
                         required
                         />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                          <input
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          onChange={changeHandler}
                          value={form.password}
                          required
                         />
                    </div>
                    <button className="btn btn-primary btn-block" disabled={loading}>
                      {loading ? "Registering..." : "REGISTER"}
                    </button>
                    </form>
                  <p className="text-center mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;