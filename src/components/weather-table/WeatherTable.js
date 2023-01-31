import { useEffect, useState, memo } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import useWeatherService from "../../service/WeatherService";
import { _changeDayMonth, _changeWeek } from "../../utils";
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

const WeatherTable = memo(({weatherArr, loading, error}) => {
    const [date, setDate] = useState(new Date());
    const [weatherArrFiltered, setWeatherArrFiltered] = useState([]);
    const {getWeather, process, setProcess, clearError} = useWeatherService();

    useEffect(() => {
        onUpdateTime();
    }, [])
    console.log(weatherArr);
    useEffect(() => {
        if(weatherArr && weatherArr.length > 0) {
            setWeatherArrFiltered(
                weatherArr.filter(obj => {
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
        }
    }, [weatherArr])

    const onUpdateTime = () => {
        return setDate(new Date());
    }

    const spinnerContent = loading && <Spinner />;
    const errorContent = error && <Error />;
    const content = (!loading && !error) && <View date={date} arr={weatherArrFiltered}/>;

    
    return (
        <div className="app-weather__content">
            {spinnerContent}
            {errorContent}
            {content}
        </div>
        
    )
});

const View = ({date, arr}) => {
    const setColClasses = (weekDay) => {
        const a = weekDay > 6 ? weekDay - 7 : weekDay;
        return (a > 0 && a < 6) ? 'col-head': 'col-head col-head_weekend';
    }

    const actualWeekDay = (n) => _changeWeek(date, n);
    const actualDay = (n) => _changeDayMonth(date, n, 'day');  
    const actualMonth = (m) => _changeDayMonth(date, m, 'month');

    return (
        <table className="app-weather__table">
            <thead>
                {/* формирование строки с днями недели, месяцем и числами */}
                <tr className="row"> 
                    {[...new Set(arr.map(item => new Date(item.dt).getDate()))].map((item, i) => {
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
                    {arr.map(item => <TimeCol key={item.id} item={item}/>)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        <p className="tar">Облачность, %</p>
                    </td>
                    {arr.map(item => <SkyCol key={`${item.id}a`} item={item} />)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        Температура, &#8451;
                    </td>
                    {arr.map(item => <TempCol key={`${item.id}b`} item={item}/>)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        Ощущается как, &#8451;
                    </td>
                    {arr.map(item => <FeelsCol key={`${item.id}c`} item={item}/>)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        Давление, мм.рт.ст
                    </td>
                    {arr.map(item => <PressureCol key={`${item.id}d`} item={item}/>)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        <p className="tar">Ветер: скорость м/с</p>
                        <p className="tar">порывы м/с</p>
                        <p className="tar">направление</p>
                    </td>
                    {arr.map(item => <WindCol key={`${item.id}e`} item={item}/>)}
                </tr>
                <tr>
                    <td className="col-body col-body_side">
                        Влажность, %
                    </td>
                    {arr.map(item => <HumidityCol key={`${item.id}f`} item={item}/>)}
                </tr>
            </tbody>
        </table>
    )
}

export default WeatherTable;