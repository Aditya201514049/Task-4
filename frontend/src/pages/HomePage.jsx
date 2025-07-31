import { useEffect, useState } from "react";
import { getUsers, blockUsers, unblockUsers, deleteUsers } from "../api";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [message, setMessage] = useState("");
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
    setMessage(res.message || res.error || "Operation done");
    setSelected([]);
    setSelectAll(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="container py-4">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom mb-4 shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">User Management</span>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Toolbar */}
      <div className="d-flex align-items-center mb-3 gap-2">
        <button
          className="btn btn-warning"
          onClick={() => handleAction("block")}
          disabled={selected.length === 0}
          title="Block selected users"
        >
          <i className="bi bi-slash-circle me-1"></i>Block
        </button>
        <button
          className="btn btn-success"
          onClick={() => handleAction("unblock")}
          disabled={selected.length === 0}
          title="Unblock selected users"
        >
          <i className="bi bi-check-circle me-1"></i>Unblock
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleAction("delete")}
          disabled={selected.length === 0}
          title="Delete selected users"
        >
          <i className="bi bi-trash me-1"></i>Delete
        </button>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle bg-white shadow-sm">
          <thead className="table-light">
            <tr>
              <th className="text-center" style={{width: '40px'}}>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  aria-label="Select all"
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Last Login</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(u.id)}
                    onChange={() => handleSelect(u.id)}
                    aria-label="Select user"
                  />
                </td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "Never"}</td>
                <td>
                  <span className={`badge ${u.status === "active" ? "bg-success" : "bg-secondary"}`}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;