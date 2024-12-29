
// Adding comma
export const FixedNumber = (number) => {
    return number.toLocaleString()
}

// Total income
export const calculateTotalIncome = (employees) =>
    employees.reduce(
        (total, employee) =>
            total + employee.incomes.reduce((sum, income) => sum + income, 0),
        0
    );

// Added each employees' salary which is percented for net income
export const calculateAddedSalaries = (employees, percent) =>
    employees.map(
        (employee) =>
            (employee.incomes.reduce((sum, income) => sum + income, 0) * percent) /
            100
    );