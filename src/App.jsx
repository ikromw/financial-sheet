import "./App.css";
import UsersForm from "./components/UsersForm";
import IncomeForm from "./components/IncomeForm";
import { test_data, users } from "./db/db";
import { PriceFormat, calculateTotalIncome } from "./lib/utils";
import { useState } from "react";
import { MSGS, DEFAULT_PERCENT } from "./lib/settings";

const PERCENT = 10;


function App() {
  const [usersData, setUsersData] = useState(users)
  const [userDataForm, setUserDataForm] = useState(false)

  const [data, setData] = useState(test_data)
  const [dataForm, setDataForm] = useState(false)
  const [dataFormSchema, setDataFormSchema] = useState(
    {
      name: "",
      date: new Date().toLocaleDateString(),
      income: 0,
      expense: 0
    }
  )



  // Handle users form component
  const handleFormSubmit = (formData) => {
    setUsersData([...usersData, formData]);
  }

  // Handle main income data
  const handleIncomeFormSubmit = (e) => {
    e.preventDefault();
    console.log("Data Form Schema: ", dataFormSchema);

    // Find the existing entry for the current name (if any)
    const existingEntryIndex = data.findIndex((item) => item.name === dataFormSchema.name);

    if (existingEntryIndex !== -1) {
      // If an entry exists, update its records
      const updatedData = [...data];
      updatedData[existingEntryIndex].records.push({
        date: dataFormSchema.date,
        income: parseFloat(dataFormSchema.income), // Parse income as a number
        expense: parseFloat(dataFormSchema.expense), // Parse expense as a number
      });
      setData(updatedData);
    } else {
      // If no entry exists, create a new one
      setData([
        ...data,
        {
          name: dataFormSchema.name,
          records: [
            {
              date: dataFormSchema.date,
              income: parseFloat(dataFormSchema.income), // Parse income as a number
              expense: parseFloat(dataFormSchema.expense), // Parse expense as a number
            },
          ],
        },
      ]);
    }

    setDataFormSchema({
      name: "",
      date: new Date().toLocaleDateString(),
      income: 0,
      expense: 0
    })
    setDataForm(false)
  }

  // Calcluted total income
  const totalIncome = calculateTotalIncome(data);


  // Seperated managers from employees
  const managers = usersData.filter((manager) => manager.is_manager === true);


  return (
    <main>

      <h2>
        {managers.length < 2 ? "Manager: " : "Managers: "}
        {managers.length > 0 ? (
          managers.map((manager, index) => (
            <span key={index}> {manager.name}{index < managers.length - 1 ? ", " : ""}</span>
          ))
        ) : (MSGS.no_manager)}
      </h2>

      <br />
      <hr />
      <br />

      <div className="employees-section">
        {usersData.length < 2 ? <h2>Employee</h2> : <h2>Employees</h2>}

        <button onClick={() => setUserDataForm(!userDataForm)}>
          {userDataForm ? "-" : "+"}
        </button>
      </div>

      <br />

      <ul>
        {usersData.length > 0
          ? usersData.map((employee, index) => (
            <ol key={index} className={employee.is_manager ? "manager" : "employee"}>
              {employee.name}
            </ol>
          ))
          : (MSGS.no_employee)}

      </ul>
      {userDataForm && <UsersForm onSubmit={handleFormSubmit} />}

      <br />
      <br />

      {dataForm && (
        <IncomeForm
          usersData={usersData}
          onSubmit={handleIncomeFormSubmit}
          dataFormSchema={dataFormSchema}
          setDataFormSchema={setDataFormSchema}
        />
      )}


      <div className="income-section">
        <p className="table--title-incomes">Incomes</p>

        {
          usersData.length > 0 ?
            <button onClick={() => setDataForm(!dataForm)}>
              {dataForm ? "-" : "+"}
            </button>
            :
            null
        }

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
            usersData.length == 0 ?
              MSGS.employee_add_form :
              data.length === 0 ? MSGS.route_the_form :
                data.map((employee) =>
                  employee.records.map((record, recordIndex) => (
                    <tr key={recordIndex}>
                      {recordIndex === 0 && (
                        <td className="no-color" rowSpan={employee.records.length}>{employee.name}</td>
                      )}
                      <td>{record.date}</td>
                      <td>{PriceFormat(record.income)}</td>
                      <td>{PriceFormat(record.expense)}</td>
                      <td>{PriceFormat(record.income - record.expense)}</td>
                    </tr>
                  ))
                )
          }
        </tbody>
      </table>

      <br />
      <hr />
      <h4>Total Income: {PriceFormat(totalIncome)}</h4>

      <br />

      <details>
        <summary>Salaries ({DEFAULT_PERCENT}%)</summary>


        <ul>
          {
            data.length === 0 ? MSGS.route_the_form :
              data.map((employee, index) => {
                const totalSalary = employee.records.reduce((sum, record) => sum += record.income * DEFAULT_PERCENT / 100, 0);
                const expenses = employee.records.reduce((sum, record) => sum += record.expense, 0)
                return (
                  <ol key={index}>{employee.name}: {PriceFormat(totalSalary - expenses)}</ol>
                )
              })
          }
        </ul>
      </details>

      <br />
      <hr />
      <h4>Net Income:
        {
          data.length === 0 ? MSGS.route_the_form :
            data.map((employee, index) => {
              const totalSalary = employee.records.reduce((sum, record) => sum += record.income * DEFAULT_PERCENT / 100, 0);
              const expenses = employee.records.reduce((sum, record) => sum += record.expense, 0)
              const netPrices = totalIncome - (totalSalary - expenses)

              return console.log(netPrices);
            })
        }
      </h4>
    </main >
  );
}

export default App;
