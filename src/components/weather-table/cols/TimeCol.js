const TimeCol = ({item}) => {
    const colBgStyleClass = item.background ? 'col-body col-body_dark' : 'col-body';
    const colValStyleClass = item.background ? 'col-time col-time_dark' : 'col-time';
    return (
        <td 
            className={colBgStyleClass}>
                <span className={colValStyleClass}>
                    {item.dt.getHours() < 10 ? `0${item.dt.getHours()}`: item.dt.getHours()}
                </span>
        </td>
    )
};
export default TimeCol;