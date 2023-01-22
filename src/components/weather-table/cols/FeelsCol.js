const FeelsCol = ({item}) => {
    const {feels} = item.main;
    const colStyleClass = item.background ? 'col-body col-body_dark' : 'col-body';
    const colTempStyleClass = 
        feels < -27 ? 'col-temp col-temp_very-cold' :
        feels < -15 ? 'col-temp col-temp_cold' :
        feels < 0 ? 'col-temp col-temp_middle' : 
        feels >= 0 ? 'col-temp col-temp_pos' : 
        feels > 25 ? 'col-temp col-temp_hot' : 
        feels > 35 ? 'col-temp col-temp_heat' : 'col-temp';
    return (
        <td 
            
            className={colStyleClass}>
            <span className={colTempStyleClass}> 
                {Math.floor(feels)}
            </span>
        </td>
    )
};
export default FeelsCol;