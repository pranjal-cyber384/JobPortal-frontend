import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../Context/AdminContext";

const UsersPage = () => {
  const {
    users,
    fetchUsers,
    deleteUser,
    page,
    pages,
    loading,
  } = useContext(AdminContext);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    fetchUsers(page, keyword);
  }, [page]);

  return (
      <div className="admin-page fade-in">
      <div className="admin-header">
      <h3 className="mb-4">Manage Users</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search user..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button
        className="btn btn-primary mb-3"
        onClick={() => fetchUsers(1, keyword)}
      >
        Search
      </button>
      </div>
      {loading ? (
        <div className="spinner-border"></div>
      ) : (
        <>
           <div className="admin-card">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                     {user.role}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn-delete-user"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="admin-pagination">
            <button
              className="btn btn-secondary me-2"
              disabled={page === 1}
              onClick={() => fetchUsers(page - 1, keyword)}
            >
              Prev
            </button>
            <span className="align-self-center">
              Page {page} of {pages}
            </span>
            <button
              className="btn btn-secondary ms-2"
              disabled={page === pages}
              onClick={() => fetchUsers(page + 1, keyword)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersPage;