const HumidityCol = ({item}) => {
    const {humidity} = item.main;
    const colStyleClass = item.background ? 'col-body col-body_dark' : 'col-body';
    
    return (
        <td 
            className={colStyleClass}>
            <span className="col-humidity">{humidity}</span>
        </td>
    )
};
export default HumidityCol;