import { useState } from "react";

const UsersForm = ({ onSubmit }) => {
    const [employeeFormSchema, setEmployeeFormSchema] = useState({
        name: "",
        is_manager: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setEmployeeFormSchema({
            ...employeeFormSchema, [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(employeeFormSchema);
        setEmployeeFormSchema({
            name: "",
            is_manager: false,
        })
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                aria-label="Employee name"
                value={employeeFormSchema.name}
                placeholder="Name"
                onChange={handleChange}
                required
            />


            <label htmlFor="is_manager">{employeeFormSchema.is_manager ? "Manager" : "Is manager?"}</label>
            <input
                type="checkbox"
                id="is_manager"
                name="is_manager"
                aria-label="Ask if employee is manager"
                checked={employeeFormSchema.is_manager}
                onChange={handleChange}
            />

            <button type="submit">Add</button>
        </form>
    )
}

export default UsersForm