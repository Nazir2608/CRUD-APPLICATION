import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import "./user.css";
import axios from "axios";
import toast from 'react-hot-toast';
const User = () => {

  const [users, setUsers] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getAllUser");
      setUsers(response.data);
    }
    fetchData();
  }, [])

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:8000/api/deleteUser/${userId}`)
      .then((response) => {
        // Update state by removing the deleted user
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      //  console.log("User deleted successfully:", response);
        toast.success(response.data.msg, { position: "top-right" });
        // Optional delay before navigation
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        console.error("Error while deleting user:", error);
        alert("Failed to delete user. Please try again.");
      });
  };
  

  return (
    <div className='userTable'>
      <Link to={"/add"} className='addButton'>Add User</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.fname} {user.lname}</td>
                  <td>{user.email}</td>
                  <td className='actionButtons'>
                    <button onClick={() => { deleteUser(user._id) }}><i className="fa-solid fa-trash"></i></button>
                    <Link to={`/edit/` + user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </table>
    </div>
  )
}

export default User
