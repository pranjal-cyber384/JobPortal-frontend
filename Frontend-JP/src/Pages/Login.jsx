import React, {useContext, useReducer, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const initialState = {
  email: "",
  password: "",
};
const loginReducer = (state, action) => {
  if (action.type === "email" || action.type === "password") {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }
  return state;
};
const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const changeHandler = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
    if (error) setError("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
  const res = await login(state);
   if(!res || !res.success) {
    throw new Error("User not found");
   }
  const redirectPath =
    location.state?.from?.pathname ||
    (res.role === "admin" ? "/admin/dashboard" : "/");

  navigate(redirectPath);

} catch (err) {
  setError(err.response?.data?.message || "Login failed");
} finally {
  setLoading(false);
}
  };
  return (
    <>
      <div className="auth-container d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card auth-card">
                <div className="card-body">
                  <h3 className="text-center mb-4">Login</h3>
                   {error ? <div className="alert alert-danger">{error}</div> : null}
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                       type="email"
                       name="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={changeHandler}
                        required
                         />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                       type="password"
                       name="password"
                       className="form-control"
                       placeholder="Enter password"
                       onChange={changeHandler}
                       value={state.value}
                       required
                        />
                    </div>

                    <button className="btn btn-primary btn-block" disabled={loading}>
                         {loading ? "Logging in..." : "LOGIN"}
                    </button>
                  </form>
                  <p className="text-center mt-3">
                    Don't have an account? <Link to="/user/register">Create an account</Link>
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

export default Login;