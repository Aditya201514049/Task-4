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

  return (
    <div className="container mt-5">
      <h2>User Management</h2>
      <div className="mb-3">
        <button onClick={() => handleAction("block")} disabled={selected.length === 0}>
          Block
        </button>
        <button onClick={() => handleAction("unblock")} disabled={selected.length === 0} style={{marginLeft: 8}}>
          Unblock
        </button>
        <button onClick={() => handleAction("delete")} disabled={selected.length === 0} style={{marginLeft: 8}}>
          Delete
        </button>
      </div>
      {message && <div>{message}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>
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
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(u.id)}
                  onChange={() => handleSelect(u.id)}
                  aria-label="Select user"
                />
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{new Date(u.lastLogin).toLocaleString()}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;