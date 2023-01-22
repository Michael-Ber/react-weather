const TempCol = ({item}) => {
    const {temp} = item.main;
    const colStyleClass = item.background ? 'col-body col-body_dark' : 'col-body';
    const colTempStyleClass = 
        temp < -27 ? 'col-temp col-temp_very-cold' :
        temp < -15 ? 'col-temp col-temp_cold' :
        temp < 0 ? 'col-temp col-temp_middle' : 
        temp >= 0 ? 'col-temp col-temp_pos' : 
        temp > 25 ? 'col-temp col-temp_hot' : 
        temp > 35 ? 'col-temp col-temp_heat' : 'col-temp';
    return (
        <td 
            
            className={colStyleClass}>
            <span className={colTempStyleClass}> 
                {Math.floor(temp)}
            </span>
        </td>
    )
};
export default TempCol;