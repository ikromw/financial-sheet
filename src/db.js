// Income data scheme:
// name: string
// is_manager: boolean
// records: -> array of objects
//   date: string
//   income: number
//   expense: number
export const dataDB = [
    {
        name: "John Doe",
        is_manager: true,
        records: [
        {
            date: "2025-01-01",
            income: 1000,
            expense: 500,
        },
        {
            date: "2025-02-01",
            income: 1200,
            expense: 600,
        },
        ],
    },
    {
        name: "Jane Smith",
        is_manager: false,
        records: [
        {
            date: "2023-01-15",
            income: 800,
            expense: 300,
        },
        {
            date: "2023-02-15",
            income: 900,
            expense: 400,
        },
        ],
    },
]