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
export const calculateEmployeeSalaries = (data, DEFAULT_PERCENT) => {
    if (data.length === 0) {
        return [];
    }

    return data.map((employee) => {
        const totalSalary = employee.records.reduce(
            (sum, record) => sum + record.income * (DEFAULT_PERCENT / 100),
            0
        );
        const expenses = employee.records.reduce(
            (sum, record) => sum + record.expense,
            0
        );
        const netSalary = totalSalary - expenses;

        return {
            name: employee.name,
            netSalary: netSalary,
        };
    });
};

// Net income
export const calculateNetIncome = (data, DEFAULT_PERCENT) => {
    if (data.length === 0) {
        return [];
    }

    let totalSalaries = data.map((employee) => employee.records.reduce((sum, record) => sum + record.income * (DEFAULT_PERCENT / 100), 0))

    return totalSalaries.reduce((sum, record) => sum + record);
}

