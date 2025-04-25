// Format cost
export const formatCost = (number) => {
    if (!number) return 0;
    return Number(number).toLocaleString("en-US")
}

// Plurals title
export const Plurals = (data, text) => {
    return data.length > 1 ? text + "s:" : text + ": "
}


// ################
// ### EMPLOYEE ###
// ################

// Salary
export const getEmployeeSalary = (employee, FINANCE_PERCENT) => {
    if (employee.length === 0) {
        return 0;
    }
    const totalSalary = employee.records.reduce(
        (sum, record) => sum + Number(record.income) * (FINANCE_PERCENT / 100), 0
    );

    const expenses = employee.records.reduce(
        (sum, record) => sum + Number(record.expense),
        0
    );

    return totalSalary - expenses;
};

// Total income
export const getEmployeeTotalIncome = (employee) => {
    if (employee.length === 0) {
        return console.log("getEmployeeTotalIncome(): total income: data length = 0!");
    }

    let totalIncome = 0;
    for (const record of employee.records) {
        totalIncome += Number(record.income);
    }

    return totalIncome;
};

// Total expense
export const getEmployeeTotalExpense = (employee) => {
    if (employee.length === 0) {
        return 0;
    }

    let totalExpense = 0;
    for (const record of employee.records) {
        totalExpense += Number(record.expense);
    }

    return totalExpense;
};


// ###############
// ### FINANCE ###
// ###############

// Total incomes
export const getTotalIncome = (data) => {
    if (data.length === 0) {
        return 0;
    }

    const totalIncome = data.map(employee =>
        employee.records.reduce((sum, record) => sum += Number(record.income), 0)
    )
    return totalIncome.reduce((sum, income) => sum + income, 0)
}

// Total expenses
export const getTotalExpenses = (data) => {
    if (data.length === 0) {
        return 0;
    }

    let totalExpenses = 0;
    for (const employee of data) {
        for (const record of employee.records) {
            totalExpenses += Number(record.expense);
        }
    }
    return totalExpenses;
};

// Net income
export const getNetIncome = (data, FINANCE_PERCENT) => {
    if (data.length === 0) {
        return 0;
    }

    let totalSalaries = data.map((employee) => employee.records.reduce((sum, record) => sum + Number(record.income) * (FINANCE_PERCENT / 100), 0))

    return totalSalaries.reduce((sum, record) => sum + record);
}