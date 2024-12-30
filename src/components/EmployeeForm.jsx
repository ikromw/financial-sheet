import { useState } from "react";
import { test_data } from "../db/db";

const EmployeeForm = ({ onSubmit }) => {
    const [employeeFormData, setEmployeeFormData] = useState({
        name: "",
        is_manager: false,
        records: {
            date: new Date().toLocaleDateString(),
            income: 0,
            expense: 0
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setEmployeeFormData({
            ...employeeFormData, [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(employeeFormData);

        console.log("Employee data is added to the database via (Handle Submit Function): ");
        console.table(employeeFormData);
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                aria-label="Employee name"
                value={employeeFormData.name}
                placeholder="Name"
                onChange={handleChange}
                required
            />


            <label htmlFor="is_manager">{employeeFormData.is_manager ? "Manager" : "Is manager?"}</label>
            <input
                type="checkbox"
                id="is_manager"
                name="is_manager"
                aria-label="Ask if employee is manager"
                checked={employeeFormData.is_manager}
                onChange={handleChange}
            />

            <button type="submit">Add</button>
        </form>
    )
}

export default EmployeeForm