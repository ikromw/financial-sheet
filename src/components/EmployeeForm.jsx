import { useState } from "react";
import { test_data } from "../db/db";

const EmployeeForm = ({ onSubmit }) => {
    const [employeeFormData, setEmployeeFormData] = useState({
        name: "",
        is_manager: false,
        incomes: test_data[0].incomes.map((_) => 0)
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle checkbox state for is_manager
        if (type === "checkbox") {
            setEmployeeFormData({
                ...employeeFormData,
                [name]: checked,
            });
        } else {
            setEmployeeFormData({
                ...employeeFormData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(employeeFormData);
        setEmployeeFormData({ name: "", is_manager: false, incomes:  test_data[0].incomes.map((_) => 0) }); // Reset the form data
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

            <label htmlFor="is_manager">Is manager?</label>
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