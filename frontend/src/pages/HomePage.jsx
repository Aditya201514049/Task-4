import { useEffect, useState } from "react";
import { getUsers, blockUsers, unblockUsers, deleteUsers } from "../api";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [message, setMessage] = useState("");
  const [filterText, setFilterText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    getUsers(token).then(data => {
      if (data.error) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        setUsers(data);
      }
    });
  }, [token, message]);

  function handleSelect(id) {
    setSelected(selected =>
      selected.includes(id)
        ? selected.filter(sid => sid !== id)
        : [...selected, id]
    );
  }

  function handleSelectAll() {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      setSelected(users.map(u => u.id));
      setSelectAll(true);
    }
  }

  async function handleAction(action) {
    if (selected.length === 0) return;
    let res;
    if (action === "block") res = await blockUsers(selected, token);
    if (action === "unblock") res = await unblockUsers(selected, token);
    if (action === "delete") res = await deleteUsers(selected, token);
    setMessage(res.message || res.error || "Operation completed successfully");
    setSelected([]);
    setSelectAll(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filterText.toLowerCase()) ||
    user.email.toLowerCase().includes(filterText.toLowerCase())
  );

  const formatLastSeen = (lastLogin) => {
    if (!lastLogin) return "Never";
    const now = new Date();
    const loginTime = new Date(lastLogin);
    const diffInMinutes = Math.floor((now - loginTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return "less than a minute ago";
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) > 1 ? 's' : ''} ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInMinutes / 10080)} week${Math.floor(diffInMinutes / 10080) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Modern Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">
            <i className="bi bi-people-fill me-2"></i>
            User Management
          </span>
          <div className="d-flex align-items-center">
            <span className="text-light me-3">
              <i className="bi bi-person-circle me-1"></i>
              Admin
            </span>
            <button 
              className="btn btn-outline-light btn-sm" 
              onClick={handleLogout}
              title="Logout"
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-4">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="h4 mb-0 text-dark fw-semibold">
                <i className="bi bi-list-ul me-2 text-primary"></i>
                User List
              </h2>
              <div className="d-flex gap-2">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Filter users..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{ width: '250px' }}
                  />
                  <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-2 text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={() => handleAction("block")}
                disabled={selected.length === 0}
                title="Block selected users"
              >
                <i className="bi bi-lock me-1"></i>
                Block ({selected.length})
              </button>
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => handleAction("unblock")}
                disabled={selected.length === 0}
                title="Unblock selected users"
              >
                <i className="bi bi-unlock me-1"></i>
                Unblock ({selected.length})
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleAction("delete")}
                disabled={selected.length === 0}
                title="Delete selected users"
              >
                <i className="bi bi-trash me-1"></i>
                Delete ({selected.length})
              </button>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div className="row mb-3">
            <div className="col-12">
              <div className="alert alert-info alert-dismissible fade show" role="alert">
                <i className="bi bi-info-circle me-2"></i>
                {message}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setMessage("")}
                ></button>
              </div>
            </div>
          </div>
        )}

        {/* Modern User Table */}
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="border-0 ps-3" style={{width: '50px'}}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectAll}
                              onChange={handleSelectAll}
                              aria-label="Select all"
                            />
                          </div>
                        </th>
                        <th className="border-0 fw-semibold text-muted">
                          <i className="bi bi-chevron-down me-1"></i>
                          Name
                        </th>
                        <th className="border-0 fw-semibold text-muted">
                          <i className="bi bi-chevron-down me-1"></i>
                          Email
                        </th>
                        <th className="border-0 fw-semibold text-muted">
                          <i className="bi bi-clock me-1"></i>
                          Last Seen
                        </th>
                        <th className="border-0 fw-semibold text-muted text-center">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr key={user.id} className={selected.includes(user.id) ? 'table-primary' : ''}>
                          <td className="ps-3">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selected.includes(user.id)}
                                onChange={() => handleSelect(user.id)}
                                aria-label="Select user"
                              />
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="fw-semibold text-dark">{user.name}</div>
                              <div className="small text-muted">User</div>
                            </div>
                          </td>
                          <td>
                            <span className="text-dark">{user.email}</span>
                          </td>
                          <td>
                            <div>
                              <div className="text-dark">{formatLastSeen(user.lastLogin)}</div>
                              <div className="small text-muted">
                                {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "No login history"}
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <span className={`badge rounded-pill ${
                              user.status === "active" 
                                ? "bg-success-subtle text-success" 
                                : "bg-secondary-subtle text-secondary"
                            }`}>
                              <i className={`bi ${user.status === "active" ? "bi-check-circle" : "bi-x-circle"} me-1`}></i>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-5">
                    <i className="bi bi-people text-muted" style={{fontSize: '3rem'}}></i>
                    <p className="text-muted mt-3">
                      {filterText ? 'No users found matching your filter.' : 'No users available.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center text-muted small">
              <span>
                Showing {filteredUsers.length} of {users.length} users
              </span>
              <span>
                {selected.length} selected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;