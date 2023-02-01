const TimeCol = ({item}) => {
    const colBgStyleClass = item.background ? 'col-body col-body_dark' : 'col-body';
    const colValStyleClass = item.background ? 'col-time col-time_dark' : 'col-time';
    return (
        <td 
            className={colBgStyleClass}>
                <span className={colValStyleClass}>
                    {new Date(item.dt).getUTCHours() < 10 ? `0${new Date(item.dt).getUTCHours()}`: new Date(item.dt).getUTCHours()}
                </span>
        </td>
    )
};
export default TimeCol;