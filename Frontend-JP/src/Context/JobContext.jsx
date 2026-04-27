import { createContext, useReducer } from "react";
import api from "../service/api";

 const JobContext = createContext();
const initialState = {
  jobs: [],
  job: null,
  page: 1,
  pages: 1,
  filters: {
    keyword: "",
    location: "",
    category: "",
  },
};

const jobReducer = (state, action) => {
  switch (action.type) {
    case "ADD_JOB":
      return {
        ...state,
        jobs: [action.payload, ...state.jobs],
      };

    case "FETCH_JOBS":
      return {
        ...state,
        jobs: action.payload,
      };

    case "FETCH_JOB":
      return {
        ...state,
        job: action.payload,
      };

    case "SET_PAGINATION":
      return {
        ...state,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };

    default:
      return state;
  }
};

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

    const fetchjobs = async (page = 1, filters = {}) => {
  try {
    const res = await api.get("/api/jobs/jobs", {
      params: {
        page,
        ...filters,
        t: Date.now(),
      },
    });
    console.log("JOB RESPONSE:", res.data);
    dispatch({
      type: "FETCH_JOBS",
      payload: res.data.data, 
    });

    dispatch({
      type: "SET_PAGINATION",
      payload: {
        page: res.data.page,
        pages: res.data.pages,
      },
    });

  } catch (err) {
    console.error(err);
  }
}; 

  const fetchJob = async (id) => {
  if (!id) return;

  try {
    const res = await api.get(`/api/jobs/jobs/${id}`);
    console.log("FETCH JOB RESPONSE:", res.data);
    dispatch({
      type: "FETCH_JOB",
      payload: res.data.data,
    });
    return res.data.data;
    } catch (err) {
    console.error(err);
    }
    };

  const addNewJobs = async (jobData) => {
    try {
      const res = await api.post("/api/jobs", jobData);
      dispatch({
        type: "ADD_JOB",
        payload: res.data.data,
      });
      return res.data;
    } catch (err) {
      console.error("Error adding job:", err.response?.data || err);
      throw err;
    }
  };

  const deleteJob = async (id) => {
    try {
      await api.delete(`/api/jobs/jobs/${id}`);
      await fetchjobs(state.page, state.filters);
       } catch (err) {
      console.error("Error deleting job:", err.response?.data || err);
       }
      };

    const editJob = async (id, updatedJob) => {
    try {
    console.log("API ID:", id);
    console.log("API DATA:", updatedJob);

    const res = await api.put(`/api/jobs/jobs/${id}`, updatedJob);

    await fetchjobs(state.page, state.filters);

    return res.data;
     } catch (err) {
    console.error("UPDATE ERROR:", err.response?.data || err);
    throw err;
     }
    };
    
   const fetchMyJobs = async (page = 1) => {
  try {
    const res = await api.get("/api/jobs/recruiter/my-jobs", {
      params: { page },
    });
    dispatch({
      type: "FETCH_JOBS",
      payload: res.data.data,
    });
    dispatch({
      type: "SET_PAGINATION",
      payload: {
        page: res.data.page,
        pages: res.data.pages,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
  const searchJobs = (newFilters) => {
    const updatedFilters = {
      ...state.filters,
      ...newFilters,
    };
    dispatch({
      type: "SET_FILTERS",
      payload: updatedFilters,
    });
    fetchjobs(1, updatedFilters);
  };
  return (
    <JobContext.Provider
      value={{
        jobs: state.jobs,
        job: state.job,
        page: state.page,
        pages: state.pages,
        filters: state.filters,
        fetchjobs,
        fetchJob,
        addNewJobs,
        deleteJob,
        editJob,
        fetchMyJobs,
        searchJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
