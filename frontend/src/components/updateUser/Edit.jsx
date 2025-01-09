import React, { useEffect, useState } from 'react';
import "./edit.css";

import { Link, useNavigate,useParams} from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Edit = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });
const navigate = useNavigate();

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        // Fetch the user data for the given ID
        axios.get(`http://localhost:8000/api/getOneUser/${id}`)
            .then((response) => {
                setUser(response.data); // Populate form with existing user data
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the user data
        axios.put(`http://localhost:8000/api/updateUser/${id}`, user)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" });
                // Optional delay before navigation
                setTimeout(() => navigate("/"), 2000);
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                alert("Failed to update user. Please try again.");
            });
    };

    return (
        <div className='addUser'>
            <Link to={"/"}>Back</Link>
            <h3>Update User Details</h3>
            <form className='addUserForm' onSubmit={handleSubmit}>
                <div className='inputGroup'>
                    <label htmlFor="fname">First Name</label>
                    <input
                        type="text"
                        id='fname'
                        name='fname'
                        autoComplete='off'
                        placeholder='First Name'
                        value={user.fname} // Bind value to state
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="lname">Last Name</label>
                    <input
                        type="text"
                        id='lname'
                        name='lname'
                        autoComplete='off'
                        placeholder='Last Name'
                        value={user.lname} // Bind value to state
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id='email'
                        name='email'
                        autoComplete='off'
                        placeholder='Email'
                        value={user.email} // Bind value to state
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>UPDATE USER</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
