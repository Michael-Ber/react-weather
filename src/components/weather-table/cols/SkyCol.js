import { Tooltip } from "react-tooltip";

const iconsPath = {
    '03n': '03d',
    '04n': '04d',
    '09n': '09d',
    '11n': '11d',
    '13n': '13d',
    '50n': '50d'
};

const SkyCol = ({item}) => {
    const colBgStyleClass = item.background ? 'col-body col-body_dark' : 'col-body';
    return (
        <td 
            className={colBgStyleClass}>
            <div 
                id={item.id}
                data-tooltip-content={item.weather}
                data-tooltip-variant="info"
                className="app-weather__icon">
                <img 
                    src={require(`../../../resourses/icons/${Array.from(Object.keys(iconsPath)).includes(item.icon, 0) ? iconsPath[item.icon] : item.icon}.png`)} 
                    alt="weather icon"
                />
            </div>
            <Tooltip 
                anchorId={item.id} place='bottom'/>
        </td>
    )
};
export default SkyCol;