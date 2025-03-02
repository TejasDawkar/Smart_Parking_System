import { useState } from "react";
import '../User/userRegistration.css';

const VehicleInfo = () => {
    const [formData, setFormData] = useState({
        vehicle_no: "",
        vehicle_type: "",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = () => {

    }

    return(
    <div className="registration-container">
        <h2 style={{marginTop: '0px'}}>Vehicle Registration</h2>
        <form onSubmit={handleSubmit} className="registration-form">
            <label> Vehicle No. </label>
            <input
                type="text"
                name = "vehicle_no"
                value={formData?.vehicle_no}
                onChange={handleChange}
                required
            />
            <label>Vehicle Type</label>
            <select
                name="vehicle_type"
                value={formData?.vehicle_type}
                required
            >
                <option>Car</option>
                <option>Bike</option>
                <option>Bicycle</option>

            </select>
            <button type="submit"> Register </button>
        </form>

    </div>
    )

}
export default VehicleInfo;