const WindCol = ({item}) => {
    const {speed, deg, gust} = item.wind;
    const colStyleClass = item.background ? 'col-body col-body_dark' : 'col-body';
    const colWindStyleClass = 
    (speed < 10) ? 'col-wind' : 'col-wind col-wind_strong';
    const colGustStyleClass = 
    (gust < 10) ? 'col-wind' : 'col-wind col-wind_strong';
    return (
        <td 
            className={colStyleClass}>
            <div> 
                <p className={colWindStyleClass}>{speed}</p>
                <p className={colGustStyleClass}>{gust}</p>
                <p className="col-wind-deg">{deg}</p>
            </div>
        </td>
    )
};
export default WindCol;