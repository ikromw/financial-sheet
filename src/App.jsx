import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import { all_employees } from "../db/db";
import { FixedNumber, calculateTotalIncome, calculateAddedSalaries } from "./lib/utils";
import { useState } from "react";

const PERCENT = 10;

const other_inomce = all_employees.length < 0 ? 0 : all_employees[0].incomes.map((_, index) => 0);
function App() {
  const [data, setData] = useState(all_employees);
  const [employeeFormData, setEmployeeFormData] = useState({
    name: "",
    is_manager: false,
    incomes: other_inomce
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
    setData([...data, employeeFormData]);
    setEmployeeFormData({ name: "", is_manager: false, incomes: other_inomce }); // Reset the form data
  };


  // Simple utills from utility
  const managers = data.filter((manager) => manager.is_manager == true);
  const total_income = calculateTotalIncome(all_employees)
  const net_income = total_income - (calculateAddedSalaries(data, PERCENT).reduce((accumulator, currentValue) => accumulator + currentValue, 0));

  if (!data || data.length === 0) {
    return (
      <>
        <p>No employees available!</p>
        <EmployeeForm></EmployeeForm>
      </>
    );
  }
  return (
    <main>
      <h2>
        {managers.length < 2 ? "Manager:" : "Managers:"}
        {managers.length > 0 ? (
          managers.map((manager, index) => (
            <span key={index}> {manager.name}{index < managers.length - 1 ? ", " : ""}</span>
          ))
        ) : (
          "No manager yet!"
        )}
      </h2>

      <br />
      <hr />
      <br />

      <div className="employees-section">
        {data.length < 2 ? <h2>Employee</h2> : <h2>Employees</h2>}

        <button>+</button>
      </div>

      <br />

      <ul>
        {data.length > 0
          ? data.map((manager, index) => (
            <ol key={index} className={manager.is_manager ? "manager" : "employee"}>
              {manager.name}
            </ol>
          ))
          : "No employees yet!"}
      </ul>

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

      <br />
      <br />

      <div className="income-section">
        <p className="table--title-incomes">Incomes</p>

        <button>+</button>
      </div>
      {data.length > 0 ? (
        <table className="table incomes">
          <thead>
            <tr>
              <td>#</td>
              {data.map((manager, index) => (
                <td key={index}>{manager.name}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data[0].incomes.map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>

                {data.map((employee, colIndex) => (
                  <td key={colIndex}>{FixedNumber(employee.incomes[rowIndex]) || "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No employees yet!"
      )}
      <br />
      <hr />
      <h4>Total Income: {FixedNumber(total_income)}</h4>

      <br />

      <details>
        <summary>Salaries ({PERCENT}%)</summary>
        <ul>
          {data.length > 0
            ? data.map((employee, index) => (
              <ol key={index}>
                {employee.name}:{" "}
                {FixedNumber(
                  (employee.incomes.reduce((accumulator, currentValue) => accumulator + currentValue, 0) * PERCENT) / 100
                )}
                /{FixedNumber(employee.incomes.reduce((accumulator, currentValue) => accumulator + currentValue, 0))}
              </ol>
            ))
            : "Your company has no employees yet!"}
        </ul>
      </details>

      <br />
      <hr />
      <h4>Net Income: {FixedNumber(net_income)}</h4>
    </main>
  );
}

export default App;
