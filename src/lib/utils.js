// Custom format for prices
export const PriceFormat = (number) => {
    return number.toLocaleString()
}

// Plurals
export const Plurals = (data, text) => {
    return data.length > 1 ? text + "s: " : text + ": "
}

// Total incomes
export const calculateTotalIncomes = (data) => {
    if (data.length === 0) {
        return console.log("Total Incomes data length = 0");
    }

    const totalIncome = data.map(employee =>
        employee.records.reduce((sum, record) => sum += record.income, 0)
    )
    return totalIncome.reduce((sum, income) => sum + income, 0)
}

// Total expenses
export const calculateTotalExpenses = (data) => {
    if (data.length === 0) {
        return console.log("Total Expenses data length = 0");
    }

    let totalExpenses = 0;
    for (const employee of data) {
        for (const record of employee.records) {
            totalExpenses += record.expense;
        }
    }
    return totalExpenses;
};

// Employee's salary
export const calculateEmployeeSalary = (employee, DEFAULT_PERCENT) => {
    if (employee.length === 0) {
        return 0;
    }
    console.log("Data from employee", employee);

    const totalSalary = employee.records.reduce(
        (sum, record) => sum + record.income * (DEFAULT_PERCENT / 100),
        0
    );
    console.log("I counted total salary with percent", totalSalary);

    const expenses = employee.records.reduce(
        (sum, record) => sum + record.expense,
        0
    );
    console.log("I counted expenses", expenses);

    return totalSalary - expenses;
};

// Employee total income
export const calculateEmployeeTotalIncome = (employee) => {
    if (employee.length === 0) {
        return console.log("Employee total income data length = 0");
    }

    let totalIncome = 0;
    for (const record of employee.records) {
        totalIncome += record.income;
    }

    return totalIncome;
};

// Employee total expense
export const calculateEmployeeTotalExpense = (employee) => {
    if (employee.length === 0) {
        return console.log("Employee total expenses data length = 0");
    }

    let totalExpense = 0;
    for (const record of employee.records) {
        totalExpense += record.expense;
    }

    return totalExpense;
};


// Net income
export const calculateNetIncome = (data, DEFAULT_PERCENT) => {
    if (data.length === 0) {
        return [];
    }

    let totalSalaries = data.map((employee) => employee.records.reduce((sum, record) => sum + record.income * (DEFAULT_PERCENT / 100), 0))

    return totalSalaries.reduce((sum, record) => sum + record);
}

