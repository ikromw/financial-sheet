// Income data scheme:
// name: string
// is_manager: boolean
// records: -> array of objects
//   date: string
//   income: number
//   expense: number
export const dataDB = [
    
]

console.table(dataDB);



// RELETIONAL DATABASE STYLE
var ROLE = "manager" | "employee"

var mockUserData = {
    id: 1,
    name: "",
    role: "manager"
}
var mockRecordsData = {
    user: 1, // foreign key
    date: "2024-02-25",
    income: 5000,
    expence: 0,
    work: "3x4"
}

// NON-RELETIONAL DATABASE STYLE
var mockUserData = {
    id: 1,
    name: "",
    role: "manager",
    records: {
        id: 1,
        date: "2024-02-25",
        income: 5000,
        expence: 0,
        work: ""
    }
}