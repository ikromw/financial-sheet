import { useState, useMemo } from "react";
import "./App.css";
import "./form.css";
import dayjs from "dayjs";
import uuid from 'react-uuid';
import { dataDB } from "./db";
import { FINANCE_PERCENT } from "./lib/settings";

// ui
import Button from "./components/Button";

// icon
import {
  SquarePlus,
  SquareArrowLeft,
  SquareArrowRight,
  PanelRightClose
} from 'lucide-react';

// utils
import {
  Plurals,
  formatCost,
  // finance
  getTotalIncome,
  getEmployeeTotalIncome,
  getEmployeeTotalExpense,
  // employee
  getEmployeeSalary,
  getTotalExpenses,
  getNetIncome
} from "./lib/utils";
const FORM_CONTROL = 'closed' | 'userData' | 'recordData';


function App() {
  const [data, setData] = useState(dataDB)
  const [openForm, setOpenForm] = useState("closed")
  // Form
  const [userData, setUserData] = useState({
    id: uuid(),
    name: "",
    role: "employee",
    records: []
  });
  const [recordData, setRecordData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    income: 0,
    expense: 0,
    work: ""
  });
  // Month filter
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const selectPrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const selectNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Filtered data by month
  const filteredData = useMemo(() => {
    return data.map(employee => ({
      ...employee,
      records: employee.records.filter(record => {
        const d = dayjs(record.date);
        return d.month() === selectedMonth && d.year() === selectedYear;
      })
    }));
  }, [data, selectedMonth, selectedYear]);

  // Form handlers
  const setUserDataForm = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  // Utils
  const totalIncomes = useMemo(() => getTotalIncome(filteredData), [filteredData]);
  const totalExpenses = useMemo(() => getTotalExpenses(filteredData), [filteredData]);
  const netIncome = useMemo(() => getNetIncome(filteredData, FINANCE_PERCENT), [filteredData])

  // Managers
  const managers = data.filter((manager) => manager.role === "manager");

  // Find oldest and newest record dates
  const allRecords = data.flatMap(emp => emp.records);
  const oldestRecord = allRecords.length ? allRecords.reduce((min, rec) => dayjs(rec.date).isBefore(min) ? dayjs(rec.date) : min, dayjs(allRecords[0].date)) : null;
  const newestRecord = allRecords.length ? allRecords.reduce((max, rec) => dayjs(rec.date).isAfter(max) ? dayjs(rec.date) : max, dayjs(allRecords[0].date)) : null;

  const isPrevDisabled = oldestRecord ? (selectedMonth === oldestRecord.month() && selectedYear === oldestRecord.year()) : true;
  const isNextDisabled = newestRecord ? (selectedMonth === newestRecord.month() && selectedYear === newestRecord.year()) : true;

  if (data.length === 0) {
    return (
      <div className="app">
        <h2>No data</h2>
        <Button handleClick={() => setOpenForm(true)} icon={SquarePlus} />
      </div>
    );
  }

  return (
    <main>

      <div className="app">
        {/* MANAGERS */}
        <h2>
          {Plurals(managers, "Menejer")}

          {
            managers.map((manager, index) => (
              <span key={index}> {manager.name}{index < managers.length - 1 ? ", " : ""}</span>
            ))
          }
        </h2>

        <br />
        <hr />
        <br />

        {/* EMPLOYEES */}
        <div className="align">
          <h2>{Plurals(data, "Xodim")}</h2>
          {openForm !== "userData" && <Button handleClick={() => setOpenForm("userData")} icon={SquarePlus} />}
        </div>
        <br />
        <ul>
          {
            data.map((employee, index) => (
              <ol key={index} className={employee.role == "manager" ? "manager" : null}>
                {employee.name}
              </ol>
            ))
          }

        </ul>

        <br />
        <br />

        <section>
          <div className="income-section align">
            <div className="align">
              <h2>Records:</h2> ({FINANCE_PERCENT}%)
              {openForm !== "recordData" && <Button handleClick={() => setOpenForm("recordData")} icon={SquarePlus} />}
            </div>

            <div className="align">
              <Button handleClick={selectPrevMonth} icon={SquareArrowLeft} disabled={isPrevDisabled} />
              <p className="selectedMonth">
                {dayjs().month(selectedMonth).year(selectedYear).format('MMMM')}
              </p>
              <Button handleClick={selectNextMonth} icon={SquareArrowRight} disabled={isNextDisabled} />
            </div>
          </div>

          <br />

          {filteredData.map((employee) => (
            <details key={employee.id}>
              <summary key={employee.id}>
                {employee.name}:&nbsp;
                {formatCost(getEmployeeSalary(employee, FINANCE_PERCENT))}
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
                        <td className="income-table__body">{record.income && formatCost(record.income)}</td>
                        <td className="expense-table__body">{record.expense && formatCost(record.expense)}</td>
                      </tr>
                    ))
                  }
                  {
                    employee.records.length > 1 ?
                      <tr>
                        <td></td>
                        <td className="income-table__total">{formatCost(getEmployeeTotalIncome(employee))}</td>
                        <td className="expense-table__total">{formatCost(getEmployeeTotalExpense(employee))}</td>
                      </tr>
                      :
                      null
                  }

                </tbody>
              </table>
            </details>
          ))}

          <br />

          <div>
            <h4>
              <span>Total Income:  {formatCost(totalIncomes)} </span>

              <span>| Total Expense: {formatCost(totalExpenses)}</span>
            </h4>
            <hr />
            <br />
            <h4>Net Income: 0</h4>

          </div>

        </section>
      </div>


      {/* ASIDE FOR FORM */}
      {/* <button onClick={() => setOpenForm(!openForm)}>open the form</button> */}
      <aside className={openForm == "userData" || openForm == "recordData" ? "active" : null}>
        <div className="form">
          <div className="form__title">
            <h2>{openForm === "userData" && "New employee"}{openForm === "recordData" && "New record"}</h2>
            <PanelRightClose size={20} className="form__close-button" onClick={() => setOpenForm("closed")} />
          </div>
          <br />
          <br />
          <div>
            {
              openForm === "userData" && <UserDataForm />
              ||
              openForm === "recordData" && <RecordDataForm />
            }
          </div>

        </div>
      </aside>

    </main>
  );
}

export default App;


function UserDataForm() {
  return (
    <form>
      <div className="form__group">
        <div>
          <label htmlFor="name">Full name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <label id="role" name="employee">
            <input
              type="radio"
              value="employee"
              name="role"
            /> Employee
          </label>
          <label id="role" name="manager">
            <input
              type="radio"
              value="manager"
              name="role"
            /> Manager
          </label>
        </div>
      </div>

      <button className="form-button">Save</button>
    </form>
  )
}
function RecordDataForm() {
  return (
    <form>
      <div className="form__group">
        <div>
          <label htmlFor="user">Select employees:</label>
          <select name="user" id="user" required>
            {
              dataDB.map((employee) => (
                <option key={employee.id} value={employee.name}>{employee.name}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label htmlFor="income">Income:</label>
          <input type="number" id="income" name="income" min={0} required defaultValue={0} />
        </div>
        <div>
          <label htmlFor="expence">Expence:</label>
          <input type="number" id="expence" name="expence" min={0} required defaultValue={0} />
        </div>
      </div>

      <button className="form-button">Save</button>
    </form>
  )
}