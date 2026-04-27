import { createContext, useReducer } from "react";
import api from "../service/api";

const ApplicationContext = createContext();
const initialState = {
  applications: [],
  applicants: [],
  loading: false,
};

const applicationReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_MY_APPLICATIONS":
      return { ...state, applications: action.payload || [], };

    case "SET_APPLICANTS":
      return { ...state, applicants: action.payload };
     
    default:
      return state;
  }
};

export const ApplicationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);

  const applyJob = async (jobId, formData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const res = await api.post(
        `/api/applications/${jobId}/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;

    } catch (err) {
      console.error("APPLY ERROR:", err.response?.data || err);
      throw err;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchMyApplications = async () => {
    try {

      dispatch({ type: "SET_LOADING", payload: true });

      const res = await api.get("/api/applications/my-applications");
       console.log("API RESPONSE:", res.data.data);
      dispatch({
        type: "SET_MY_APPLICATIONS",
        payload: res.data.data,
      });

    } catch (err) {
      console.error("FETCH MY APPLICATIONS ERROR:", err);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchApplicants = async (jobId) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const res = await api.get(`/api/applications/job/${jobId}`);

      dispatch({
        type: "SET_APPLICANTS",
        payload: res.data.data,
      });

    } catch (err) {
      console.error("FETCH APPLICANTS ERROR:", err);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const updateStatus = async (applicationId, action) => {
    try {
      const res = await api.put(
        `/api/applications/${applicationId}/status`,
        { action }
      );
      return res.data;

    } catch (err) {
      console.error("UPDATE STATUS ERROR:", err);
      throw err;
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications: state.applications,
        applicants: state.applicants,
        loading: state.loading,

        applyJob,
        fetchMyApplications,
        fetchApplicants,
        updateStatus,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContext;