const PressureCol = ({item}) => {
    const {pressure} = item.main;
    const colStyleClass = item.background ? 'col-body col-body_dark' : 'col-body';
    const colPresStyleClass = 
        pressure < 730 ? 'col-pres' : 'col-pres col-pres_high';
    return (
        <td 
             
            className={colStyleClass}>
            <span className={colPresStyleClass}> 
                {Math.floor(pressure)}
            </span>
        </td>
    )
};
export default PressureCol;