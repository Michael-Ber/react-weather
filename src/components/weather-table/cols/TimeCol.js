const TimeCol = ({item}) => {
    const colBgStyleClass = item.background ? 'col-body col-body_dark' : 'col-body';
    const colValStyleClass = item.background ? 'col-time col-time_dark' : 'col-time';
    return (
        <td 
            className={colBgStyleClass}>
                <span className={colValStyleClass}>
                    {new Date(item.dt).getHours() < 10 ? `0${new Date(item.dt).getHours()}`: new Date(item.dt).getHours()}
                </span>
        </td>
    )
};
export default TimeCol;