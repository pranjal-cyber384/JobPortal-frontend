import { createContext, useReducer } from "react";
import api from "../service/api";

const AdminContext = createContext();

const initialState = {
  users: [],
  stats: null,
  loading: false,
  page: 1,
  pages: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_USERS":
      return {
        ...state,
        users: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case "SET_STATS":
      return { ...state, stats: action.payload };

    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = async (page = 1, keyword = "") => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const res = await api.get(
        `/api/admin/users?page=${page}&keyword=${keyword}`
      );

      dispatch({
        type: "SET_USERS",
        payload: res.data,
      });

    } catch (err) {
      console.error("FETCH USERS ERROR:", err);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/api/admin/user/${id}`);
      fetchUsers(state.page); // refresh
    } catch (err) {
      console.error("DELETE USER ERROR:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/api/admin/stats");

      dispatch({
        type: "SET_STATS",
        payload: res.data.data.totals,
      });

    } catch (err) {
      console.error("FETCH STATS ERROR:", err);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        users: state.users,
        stats: state.stats,
        loading: state.loading,
        page: state.page,
        pages: state.pages,
        fetchUsers,
        deleteUser,
        fetchStats,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;