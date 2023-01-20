import { useEffect, useState, memo } from "react";
import useWeatherService from "../../service/WeatherService";
import Tooltip from "../tooltip/Tooltip";
import './weatherTable.scss';

const weekDays = {
    0: 'Вс',
    1: 'Пн',
    2: 'Вт',
    3: 'Ср',
    4: 'Чт',
    5: 'Пт',
    6: 'Сб'
};

const months = {
    0: 'Января',
    1: 'Февраля',
    2: 'Марта',
    3: 'Апреля',
    4: 'Мая',
    5: 'Июня',
    6: 'Июля',
    7: 'Августа',
    8: 'Сентября',
    9: 'Октября',
    10: 'Ноября',
    11: 'Декабря',
}

const iconsPath = {
    '03n': '03d',
    '04n': '04d',
    '09n': '09d',
    '11n': '11d',
    '13n': '13d',
    '50n': '50d'
};

const WeatherTable = memo(() => {
    const [date, setDate] = useState(new Date());
    const [weatherArr, setWeatherArr] = useState([]);
    const [show, setShow] = useState(false);
    const [weather, setWeather] = useState('');
    const [coord, setCoord] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const {getWeather, process, setProcess, clearError} = useWeatherService();

    useEffect(() => {
        onUpdateTime();
    }, [])

    useEffect(() => {
        getWeather()
            .then(res => setWeatherArr(res.filter(obj => {
                return (new Date(obj.dt).getHours() === 14 || new Date(obj.dt).getHours() === 20 || new Date(obj.dt).getHours() === 2 || new Date(obj.dt).getHours() === 8)
            })))
            .then(() => setLoading(false))
            .catch(() => setError(true))
    }, [])

    const onUpdateTime = () => {
        return setDate(new Date());
    }
    const setColClasses = (weekDay) => {
         const a = weekDay > 6 ? weekDay - 7 : weekDay;
        return (a > 0 && a < 6) ? 'col-head': 'col-head col-head_weekend';
    }

    const showToolTip = (e, show, title) => {
        return <Tooltip show={show} title={title}/>
    }
    // const hideToolTip = (e) => {
    //     console.log(e)
    // }

    const actualWeekDay = (n) => weekDays[(date.getDay() + n) > 6 ? (date.getDay() + n) - 7: (date.getDay() + n)];
    const actualDay = (n) => date.getDate() + n;   
    const actualMonth = () => months[date.getMonth()];

    console.log(weatherArr);
    return (
        <div className="app-weather__content">
            <Tooltip show={show} title={weather} coord={coord}/>
            <table className="app-weather__table">
                <thead>
                    <tr className="row">
                        <th scope="col" colSpan={3} className={setColClasses(date.getDay())}>
                            Сегодня, {actualWeekDay(0)}, {actualDay(0)} {actualMonth()}
                            
                        </th>
                        <th scope="col" colSpan={4} className={setColClasses(date.getDay()+1)}>
                            Завтра, {actualWeekDay(1)}, {actualDay(1)} {actualMonth()}
                        </th>
                        <th scope="col" colSpan={4} className={setColClasses(date.getDay()+2)}>
                            {actualWeekDay(2)}, {actualDay(2)} {actualMonth()}
                        </th>
                        <th scope="col" colSpan={4} className={setColClasses(date.getDay()+3)}>
                            {actualWeekDay(3)}, {actualDay(3)} {actualMonth()}
                        </th>
                        <th scope="col" colSpan={4} className={setColClasses(date.getDay()+4)}>
                            {actualWeekDay(4)}, {actualDay(4)} {actualMonth()}
                        </th>
                        <th scope="col" colSpan={4} className={setColClasses(date.getDay()+5)}>
                            {actualWeekDay(5)}, {actualDay(5)} {actualMonth()}
                        </th>
                    </tr>

                </thead>
                <tbody>
                    <tr className="row" >
                        <td className="col-body col-body_side">
                            Местное время
                        </td>
                        {weatherArr.map(item => {
                            return (
                                <td key={`${item.id}a`} className="col-body">{new Date(item.dt).getHours() < 10 ? `0${new Date(item.dt).getHours()}`: new Date(item.dt).getHours()}</td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td className="col-body">
                            <p className="tar">Облачность, %</p>
                        </td>
                        {weatherArr.map(item => {
                            return (
                                <td key={item.id} className="col-body">
                                    <div 
                                        onMouseEnter={(e) => {
                                                setShow(true);
                                                setWeather(item.weather);
                                                setCoord([e.clientX, e.clientY])
                                            }
                                        } 
                                        onMouseLeave={(e) => setShow(false)}
                                        className="app-weather__icon">
                                        <img 
                                            src={require(`../../resourses/icons/${Array.from(Object.keys(iconsPath)).includes(item.icon, 0) ? iconsPath[item.icon] : item.icon}.png`)} 
                                            alt="weather icon"
                                        />
                                    </div>
                                </td>
                            )
                        })}
                        <td className="col-body">
                            <p></p>
                            <p></p>
                        </td>
                    </tr>
                    <tr>
                        <td className="col-body">
                            Температура, &#8451;
                        </td>
                    </tr>
                    <tr>
                        <td className="col-body">
                            Ощущается как, &#8451;
                        </td>
                    </tr>
                    <tr>
                        <td className="col-body">
                            Давление, мм.рт.ст
                        </td>
                    </tr>
                    <tr>
                        <td className="col-body">
                            <p className="tar">Ветер: скорость м/с</p>
                            <p className="tar">порывы м/с</p>
                            <p className="tar">направление</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="col-body">
                            Влажность, %
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    )
});

export default WeatherTable;