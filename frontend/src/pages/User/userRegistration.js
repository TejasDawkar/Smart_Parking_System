import { useState } from "react";
import axios from 'axios';
import "./userRegistration.css"; // Importing the CSS file
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"

const UserRegistration = () => {
    const navigate = useNavigate();
    const successToast = (message) => {
        toast.success(`${message}`);
    }
    const failedToast = (error) => {
        toast.error(`${error}`);
    }
    const [formData, setFormData] = useState({
        user_name: "",
        user_mobile: "",
        user_role: "",
        vehicle_no: "",
        vehicle_type: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            let response = await axios.post('http://localhost:5000/users/register', formData);
            console.log("Success:", response);
            if(response?.status === 201) {
                successToast(response?.data?.message);
                localStorage.setItem('Vehicle', formData?.vehicle_type);
                localStorage.setItem('User', JSON.stringify(formData));
                setTimeout(() => {
                    navigate('/pass');
                }, 1500);
            }
        } catch (error) {
            console.log("eoorr:", error);
            failedToast(error?.response?.data?.message);
        }

    };

    return (
        <div className="registration-container">
            <ToastContainer/>
            <h2 style={{marginTop: '0px'}}> User Registration </h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <label>Name</label>
                <input 
                    type="text" 
                    name="user_name"
                    placeholder="Enter name"
                    value={formData?.user_name} 
                    onChange={handleChange} 
                    required 
                />

                <label>Mobile No.</label>
                <input 
                    type="tel" 
                    name="user_mobile" 
                    placeholder="Enter mobile no."
                    value={formData?.user_mobile} 
                    onChange={handleChange} 
                    required 
                />

                <label>Role</label>
                <select 
                    type="text" 
                    name="user_role" 
                    placeholder="Enter role"
                    value={formData?.user_role} 
                    onChange={handleChange} 
                    required 
                >
                    <option value="" disabled hidden> Select role </option>
                    <option value="Student"> Student </option>
                    <option value="Faculty"> Faculty </option>
                    <option value="Other"> Other </option>
                </select>
                <label> Vehicle No. </label>
                <input
                    type="text"
                    name = "vehicle_no"
                    placeholder="Enter vehicle no."
                    value={formData?.vehicle_no}
                    onChange={handleChange}
                    required
                />
                <label>Vehicle Type</label>
                <select
                    name="vehicle_type"
                    value={formData?.vehicle_type}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled hidden> Select type </option>
                    <option value="Car"> Car </option>
                    <option value="Bike"> Bike </option>
                    <option value="Bicycle"> Bicycle </option>

                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default UserRegistration;
