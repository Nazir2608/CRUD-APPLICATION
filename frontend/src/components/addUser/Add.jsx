import React, { useState } from 'react';
import "./add.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Add = () => {

    const [user, userState] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();


    const inputHandler = (e) => {
        const { name, value } = e.target;
        userState((prevUser) => {
            const updatedUser = { ...prevUser, [name]: value };
            console.log(updatedUser);
            return updatedUser;
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/create", user);
            console.log("Response data:", response.data);
            toast.success(response.data.msg, { position: "top-right" });
            
            // Optional delay before navigation
            setTimeout(() => navigate("/"), 2000);
            
            // Reset form
            userState({ fname: "", lname: "", email: "", password: "" });
        } catch (error) {
            console.error("Error occurred while adding user:", error);
            toast.error("Failed to add user. Please try again.", { position: "top-right" });
        }
    };

    return (
        <div className='addUser'>
            <Link to={"/"}>Back</Link>
            <h3>Add New User</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" name="fname" autoComplete="off" placeholder="First Name" value={user.fname} onChange={inputHandler} />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" name="lname" autoComplete="off" placeholder="Last Name" value={user.lname} onChange={inputHandler} />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" autoComplete="off" placeholder="Email" value={user.email} onChange={inputHandler} />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" autoComplete="off" placeholder="Password" value={user.password} onChange={inputHandler} />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>ADD USER</button>
                </div>
            </form>
        </div>
    );
};

export default Add;
