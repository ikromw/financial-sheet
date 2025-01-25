import "./App.css";
import dayjs from "dayjs";
import uuid from 'react-uuid';
import UsersForm from "./components/UsersForm";
import IncomeForm from "./components/IncomeForm";
import { test_data, users } from "./db";
import { useState, useMemo } from "react";
import { MSGS, DEFAULT_PERCENT } from "./lib/settings";
import {
  PriceFormat,
  Plurals,
  calculateTotalIncomes,
  calculateEmployeeSalary,
  calculateTotalExpenses,
  calculateNetIncome
} from "./lib/utils";


function App() {
  const [usersData, setUsersData] = useState(users)
  const [userDataForm, setUserDataForm] = useState(false)

  const [data, setData] = useState(test_data)

  const [dataForm, setDataForm] = useState(false)
  const [dataFormSchema, setDataFormSchema] = useState(
    {
      id: uuid(),
      name: "",
      date: new Date().toLocaleDateString(),
      income: 0,
      expense: 0
    }
  )

  // Handle users form component
  const handleFormSubmit = (formData) => {
    setUsersData([...usersData, formData]);
    setUserDataForm(false)
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

  // Utills
  const totalIncomes = useMemo(() => calculateTotalIncomes(data), [data]);
  const totalExpenses = useMemo(() => calculateTotalExpenses(data), [data]);
  const netIncome = useMemo(() => calculateNetIncome(data, DEFAULT_PERCENT), [data])

  // Seperated managers from employees
  const managers = usersData.filter((manager) => manager.is_manager === true);


  return (
    <main>

      <h2>
        {Plurals(managers, "Manager")}

        {managers.length > 0 ? (
          managers.map((manager, index) => (
            <span key={index}> {manager.name}{index < managers.length - 1 ? ", " : ""}</span>
          ))
        ) : (MSGS.no_manager)}
      </h2>

      <br />
      <hr />
      <br />

      <div className="employees-section align">
        <h2>{Plurals(usersData, "Employee")}</h2>

        <button className="open-close-form" onClick={() => setUserDataForm(!userDataForm)}>
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


      <div className="income-section align">
        <h2>Incomes:</h2> ({DEFAULT_PERCENT}%)

        {
          usersData.length > 0 ?
            <button className="open-close-form" onClick={() => setDataForm(!dataForm)}>
              {dataForm ? "-" : "+"}
            </button>
            :
            null
        }

      </div>

      {dataForm && (
        <IncomeForm
          usersData={usersData}
          onSubmit={handleIncomeFormSubmit}
          dataFormSchema={dataFormSchema}
          setDataFormSchema={setDataFormSchema}
        />
      )}
      <br />


      {data.map((employee) => (
        <>
          <details>
            <summary key={employee.id}>
              {employee.name}:&nbsp;
              {PriceFormat(calculateEmployeeSalary(employee, DEFAULT_PERCENT))}
            </summary>

            <table>
              <thead>
                <tr>
                  <td>Dates</td>
                  <td>Incomes</td>
                  <td>Expenses</td>
                </tr>
              </thead>
              <tbody>
                {
                  employee.records.map((record) => (
                    <tr key={uuid()}>
                      <td>{dayjs(record.date).format('MMMM D, YYYY')}</td>
                      <td>{record.income && PriceFormat(record.income)}</td>
                      <td>{record.expense && PriceFormat(record.expense)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </details>

        </>

      ))}



      <br />
      <hr />
      <h4>Total Income: {totalIncomes && PriceFormat(totalIncomes)}</h4>
      <h4>Total Expense: {totalExpenses && PriceFormat(totalExpenses)}</h4>

      <br />
      <hr />
      <h4>Net Income: {totalIncomes && PriceFormat(totalIncomes - netIncome)}</h4>
    </main>
  );
}

export default App;
