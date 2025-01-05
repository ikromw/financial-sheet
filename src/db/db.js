

// Income data scheme:
// name: string (inherits from users)
// records: -> array of objects
//   date: string
//   income: number
//   expense: number
export const test_data = []

// Users data scheme:
// name: string
// is_manager: boolean
export const users = []


// Local storage
const INCOME_DATA_KEY = "income_data"
export const SET_INCOME_DATA = (data) => {
    localStorage.setItem(INCOME_DATA_KEY, JSON.stringify(data));
}
export const GET_INCOME_DATA = (data) => {
    return JSON.parse(localStorage.getItem(INCOME_DATA_KEY));
}
