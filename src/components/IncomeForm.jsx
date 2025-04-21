



const IncomeForm = ({ usersData, onSubmit, dataFormSchema, setDataFormSchema }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;

        setDataFormSchema({
            ...dataFormSchema,
            [name]: value
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <select name="name" onChange={handleChange}>
                <>
                    <option selected disabled>Employees:</option>
                    {usersData.map((user, index) => {
                        return <option key={index} value={user.name}>{user.name}</option>;
                    })}
                </>
            </select>

            <input
                type="number"
                name="income"
                placeholder="Income"
                min={0}
                aria-label="Income Price"
                onChange={handleChange}
                value={dataFormSchema.income}
                required
            />

            <input
                type="number"
                name="expense"
                placeholder="Expense"
                min={0}
                onChange={handleChange}
                value={dataFormSchema.expense}
                aria-label="Expense Price"
            />

            <button type="submit">add</button>
        </form>
    );
};

export default IncomeForm;
