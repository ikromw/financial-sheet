import "./App.css";
import dayjs from "dayjs";
import uuid from 'react-uuid';
import UsersForm from "./components/UsersForm";
import IncomeForm from "./components/IncomeForm";
import { dataDB } from "./db";
import { useState, useMemo, useCallback } from "react";
import { MSGS, DEFAULT_PERCENT } from "./lib/settings";

import IconButton from "./components/IconButton";

import {
  SquarePlus,
  SquareMinus,
  SquareArrowLeft,
  SquareArrowRight
} from 'lucide-react';

import {
  PriceFormat,
  Plurals,
  calculateTotalIncomes,
  calculateEmployeeSalary,
  calculateTotalExpenses,
  calculateEmployeeTotalIncome,
  calculateEmployeeTotalExpense,
  calculateNetIncome
} from "./lib/utils";


function App() {
  const [usersData, setUsersData] = useState(dataDB)
  const [selectDate, setSelectDate] = useState(new Date())
  const [userDataForm, setUserDataForm] = useState(false)
  const [data, setData] = useState(dataDB)
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
  
  const selectNextMonth = () => {
    const currentDate = dayjs(new Date()).format('YYYY-MM-DD');
    const nextMonth = dayjs(selectDate).add(1, 'month').format('YYYY-MM-DD');
    
    // Don't proceed if trying to go beyond current month
    if (dayjs(nextMonth).isAfter(currentDate, 'month')) {
      return alert("You can't go beyond the current month.");
    }
    
    setSelectDate(nextMonth);
    const nextMonthData = dataDB.filter((item) => 
      item.records.some((record) => 
        dayjs(record.date).isSame(nextMonth, 'month')
      )
    );
    setData(nextMonthData);
  }

  const selectPrevMonth = () => {
    const prevMonth = dayjs(selectDate).subtract(1, 'month').format('YYYY-MM-DD');
    setSelectDate(prevMonth);
    
    const prevMonthData = dataDB.filter((item) => 
      item.records.some((record) => 
        dayjs(record.date).isSame(prevMonth, 'month')
      )
    );
    setData(prevMonthData);
  }

  // Handle users form component
  const handleFormSubmit = (formData) => {
    setUsersData([...usersData, formData]);
    setUserDataForm(false)
  }

  // Handle main income data
  const handleIncomeFormSubmit = (e) => {
    e.preventDefault();
    console.log("Data Form Schema: ", dataFormSchema);

    
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

        {userDataForm ?
          <IconButton handleClick={() => setUserDataForm(!true)} icon={SquareMinus} />
          :
          <IconButton handleClick={() => setUserDataForm(true)} icon={SquarePlus} />
        }

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


      <section>

        <div className="income-section align">
          <div className="align">
            <h2>Incomes:</h2> ({DEFAULT_PERCENT}%)

            {
              usersData.length > 0 ?
                dataForm ?
                  <IconButton handleClick={() => setDataForm(!true)} icon={SquareMinus} />
                  :
                  <IconButton handleClick={() => setDataForm(true)} icon={SquarePlus} />
                : null
            }
          </div>

          <div className="align">
            <IconButton handleClick={() => selectPrevMonth()} icon={SquareArrowLeft} />
            <p className={"selectedMonth" + " " +(selectDate == dayjs(new Date()).format('YYYY-MM-DD') ? "active" : null)}>{dayjs(selectDate).format('MMMM')}</p>
            <IconButton handleClick={() => selectNextMonth()} icon={SquareArrowRight} />
          </div>
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

              <table className="employee-records__table">
                <thead>
                  <tr>
                    <td className="date-table__header">Dates</td>
                    <td className="income-table__header">Incomes</td>
                    <td className="expense-table__header">Expenses</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    employee.records.map((record) => (
                      <tr key={uuid()}>
                        <td className="date-table__body">{dayjs(record.date).format('MMMM D, YYYY')}</td>
                        <td className="income-table__body">{record.income && PriceFormat(record.income)}</td>
                        <td className="expense-table__body">{record.expense && PriceFormat(record.expense)}</td>
                      </tr>
                    ))
                  }
                  {
                    employee.records.length > 1 ?
                      <tr>
                        <td></td>
                        <td className="income-table__total">{PriceFormat(calculateEmployeeTotalIncome(employee))}</td>
                        <td className="expense-table__total">{PriceFormat(calculateEmployeeTotalExpense(employee))}</td>
                      </tr>
                      :
                      null
                  }

                </tbody>
              </table>
            </details>

          </>

        ))}

        <br />

        <div className="">
          <h4>
            <span>Total Income:  {totalIncomes | totalIncomes && PriceFormat(totalIncomes)} </span>

            <span>| Total Expense: {totalExpenses | totalExpenses && PriceFormat(totalExpenses)}</span>
          </h4>
          <hr />
          <br />
          <h4>Net Income: {(totalIncomes & netIncome) && PriceFormat(totalIncomes - netIncome)}</h4>

        </div>

      </section>


    </main>
  );
}

export default App;
