import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const location = useLocation(); // Get data from navigate()

useEffect(() => {
  if (!localStorage.getItem("token")) {
    navigate("/");
  }
  fetchUsers(page);

  // If an update was made, reflect it in the UI
  if (location.state?.updatedUser) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === location.state.updatedUser.id ? location.state.updatedUser : user
      )
    );
  }

}, [navigate, page, location.state]);
  

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredUsers(users.filter(user => 
      user.first_name.toLowerCase().includes(value) || 
      user.last_name.toLowerCase().includes(value)
    ));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://reqres.in/api/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
        setFilteredUsers(filteredUsers.filter(user => user.id !== id));
        alert("User deleted successfully!");
      } catch (error) {
        alert("Error deleting user.");
      }
    }
  };

  return (
    <div className="container">
      <h2>User List</h2>
      <input type="text" placeholder="Search users..." value={search} onChange={handleSearch} style={{ marginBottom: "15px" }} />
      <div className="user-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={user.first_name} />
            <p>{user.first_name} {user.last_name}</p>
            <div className="button-group">
            <Link to={`/edit-user/${user.id}`} className="btn" style={{ marginRight: "47px" }}>Edit</Link>
            <button onClick={() => handleDelete(user.id)} className="btn delete" style={{ marginBottom: "30px" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default UsersList;
