import { useEffect, useState, memo } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import useWeatherService from "../../service/WeatherService";
import { changeDayMonth, changeWeek } from "../../utils/changeDayWeekMonth";
import {
    FeelsCol, 
    HumidityCol, 
    PressureCol,
    SkyCol,
    TempCol,
    TimeCol,
    WindCol
} from './cols/index';

import './weatherTable.scss';

const WeatherTable = memo(({cityProp}) => {
    const [date, setDate] = useState(new Date());
    const [weatherArr, setWeatherArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const {getWeather, process, setProcess, clearError} = useWeatherService(cityProp);

    useEffect(() => {
        onUpdateTime();
    }, [])

    useEffect(() => {
        setError(false);
        setLoading(true);
        getWeather(cityProp)
            .then(res => setWeatherArr(
                res
                    .filter(obj => {
                        return (
                            new Date(obj.dt).getHours() === 14 
                            || new Date(obj.dt).getHours() === 20 
                            || new Date(obj.dt).getHours() === 2 
                            || new Date(obj.dt).getHours() === 8
                        )
                    })
                    .map(item => (
                        new Date(item.dt).getHours() === 20 || 
                        new Date(item.dt).getHours() === 2 ||
                        new Date(item.dt).getHours() === 8
                        ) ? {...item, background: 'dark'}: item
                    )
                )
            )
            .then(() => setLoading(false))
            .catch(() => {setError(true); setLoading(false)})
    }, [cityProp])

    const onUpdateTime = () => {
        return setDate(new Date());
    }

    const spinnerContent = loading && <Spinner />;
    const errorContent = error && <Error />;
    const content = (!loading && !error) && <View date={date} weatherArr={weatherArr}/>;

    
    return (
        <div className="app-weather__content">
            {spinnerContent}
            {errorContent}
            {content}
        </div>
        
    )
});

const View = ({date, weatherArr}) => {
    const setColClasses = (weekDay) => {
        const a = weekDay > 6 ? weekDay - 7 : weekDay;
        return (a > 0 && a < 6) ? 'col-head': 'col-head col-head_weekend';
    }

    const actualWeekDay = (n) => changeWeek(date, n);
    const actualDay = (n) => changeDayMonth(date, n, 'day');  
    const actualMonth = (m) => changeDayMonth(date, m, 'month');

    return (
        <table className="app-weather__table">
            <thead>
                {/* формирование строки с днями недели, месяцем и числами */}
                <tr className="row"> 
                    {[...new Set(weatherArr.map(item => new Date(item.dt).getDate()))].map((item, i) => {
                        let colspan = i === 0 ? 3 : 4;
                        let today = i === 0 ? 'Сегодня, ' : i === 1 ? 'Завтра, ': null;
                        return (
                            <th key={i} scope="col" colSpan={colspan}  className={setColClasses(date.getDay()+i)}>
                                {today}{actualWeekDay(i)}, {actualDay(i)} {actualMonth(i)}
                                
                            </th>
                        )
                    })}
                </tr>

            </thead>
            <tbody>
                <tr className="row" >
                    <td className="col-body col-body_side">
                        Местное время
                    </td>
                    {weatherArr.map(item => <TimeCol key={item.id} item={item}/>)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        <p className="tar">Облачность, %</p>
                    </td>
                    {weatherArr.map(item => <SkyCol key={`${item.id}a`} item={item} />)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        Температура, &#8451;
                    </td>
                    {weatherArr.map(item => <TempCol key={`${item.id}b`} item={item}/>)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        Ощущается как, &#8451;
                    </td>
                    {weatherArr.map(item => <FeelsCol key={`${item.id}c`} item={item}/>)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        Давление, мм.рт.ст
                    </td>
                    {weatherArr.map(item => <PressureCol key={`${item.id}d`} item={item}/>)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        <p className="tar">Ветер: скорость м/с</p>
                        <p className="tar">порывы м/с</p>
                        <p className="tar">направление</p>
                    </td>
                    {weatherArr.map(item => <WindCol key={`${item.id}e`} item={item}/>)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        Влажность, %
                    </td>
                    {weatherArr.map(item => <HumidityCol key={`${item.id}f`} item={item}/>)}
                </tr>
            </tbody>
        </table>
    )
}

export default WeatherTable;