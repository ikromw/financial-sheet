const IconButton = ({ handleClick, icon: Icon, size = 20 }) => {
    if (!Icon) {
        return null; // or handle the case where no icon is provided
    }
    return (
        <button className="open-close-form" onClick={handleClick}>
            <Icon size={size} />
        </button>
    )
}

export default IconButton;
