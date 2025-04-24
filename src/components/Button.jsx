const Button = ({ handleClick, icon: Icon, size = 20, disabled }) => {
    if (!Icon) {
        return null; // or handle the case where no icon is provided
    }
    return (
        <button className="button" onClick={handleClick} disabled={disabled}>
            <Icon size={size} />
        </button>
    )
}

export default Button;
