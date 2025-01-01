

const INCOME_DATA_KEY = "income_data"
export const SET_INCOME_DATA = (data) => {
    localStorage.setItem(INCOME_DATA_KEY, JSON.stringify(data));
}
export const GET_INCOME_DATA = (data) => {
    return JSON.parse(localStorage.getItem(INCOME_DATA_KEY));
}

export const test_data = []


export const users = []

