import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import { test_data } from "./db/db";
import { FixedNumber } from "./lib/utils";
import { useState } from "react";

const PERCENT = 10;


function App() {
  const [data, setData] = useState(test_data)
  const [incomeFormData, setIncomeFormData] = useState({
    employee: "",
    records: {
      date: new Date(),
      income: 0,
      expense: 0
    }
  })


  // Handle employee form component
  const handleFormSubmit = (formData) => {
    setData([...data, formData]);
  }

  // Simple utills from utility
  const managers = data.filter((manager) => manager.is_manager == true);



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
      <EmployeeForm onSubmit={handleFormSubmit} />

      <br />
      <br />

      <div className="income-section">
        <p className="table--title-incomes">Incomes</p>

        <button>+</button>
      </div>

      <table className="table incomes">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Income</th>
            <th>Expense</th>
            <th>Net Balance</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((employee, employeeIndex) => {
              <tr>
                <td>{employee.name}</td>
              </tr>
            })
          }
        </tbody>
      </table>

      <br />
      <hr />
      <h4>Total Income: test</h4>

      <br />

      <details>
        <summary>Salaries ({PERCENT}%)</summary>
        <ul>
          <ol>Test</ol>
        </ul>
      </details>

      <br />
      <hr />
      <h4>Net Income: test</h4>
    </main >
  );
}

export default App;
