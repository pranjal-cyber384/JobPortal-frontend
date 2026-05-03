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
     
      <div className="auth-container d-flex align-items-center">
        <div className="auth-box">
                  <h3 className="text-center mb-4">Register</h3>
                     <p className="text-center text-muted mb-4">
                    Start your journey 🚀
                     </p>
                    {error ? <div className="alert alert-danger">{error}</div> : null}
                  <form onSubmit={submitHandler}>
                    <div className="form-group mb-3">
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

                    <div className="form-group mb-3">
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

                    <div className="form-group mb-4">
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
                    <button className="btn" disabled={loading}>
                      {loading ? "Registering..." : "REGISTER"}
                    </button>
                    </form>
                  <p className="text-center mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
              </div>
           </div>
          </>
        );
      };
export default Register;