
// Adding comma
export const PriceFormat = (number) => {
    return number.toLocaleString()
}

// Total income
export const calculateTotalIncome = (data) => {
    const totalIncome = data.map(employee =>
        employee.records.reduce((sum, record) => sum += record.income, 0)
    )
    return totalIncome.reduce((sum, income) => sum + income, 0)
}
