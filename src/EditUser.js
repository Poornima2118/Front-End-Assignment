import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then((res) => setUser(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, user);
      
      alert("User updated successfully!");
  
      // Pass updated data to the user list
      navigate("/users", { state: { updatedUser: response.data } });
  
    } catch (error) {
      alert("Error updating user.");
    }
  };
  

  return (
    <div className="container">
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={user.first_name} onChange={(e) => setUser({...user, first_name: e.target.value})} required />
        <input type="text" value={user.last_name} onChange={(e) => setUser({...user, last_name: e.target.value})} required />
        <input type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
