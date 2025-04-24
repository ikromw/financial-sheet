// Income data scheme:
// name: string
// is_manager: boolean
// records: -> array of objects
//   date: string
//   income: number
//   expense: number
export const dataDB = [
    {
        id: 1,
        name: "John Doe",
        role: "manager",
        records: [
            {
                id: 1,
                date: "2025-04-24",
                income: 100000,
                expense: 0,
                work: ""
            },
            {
                id: 2,
                date: "2024-02-01",
                income: 1200,
                expense: 600,
                work: ""
            },
        ],
    },
    {
        id: 2,
        name: "Jane Smith",
        role: "employee",
        records: [
            {
                id: 1,
                date: "2023-01-15",
                income: 800,
                expense: 300,
                work: ""
            },
            {
                id: 2,
                date: "2023-02-15",
                income: 900,
                expense: 400,
                work: ""
            },
        ],
    },
    {
        id: 3,
        name: "Alice Johnson",
        role: "employee",
        records: []
    }
]


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