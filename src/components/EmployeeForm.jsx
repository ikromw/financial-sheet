const EmployeeForm = (setForm) => {
    return (
        <form>
            <input type="text" placeholder="Name" />
            <label>Is manager?</label>
            <input type="checkbox" id="is_manager" />
            <button onClick={() => setForm(false)}>Cancel</button>
            <button>Add</button>
        </form>
    )
}


export default EmployeeForm