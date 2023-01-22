import { useEffect, useState, memo, useCallback, useRef, createRef } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import useWeatherService from "../../service/WeatherService";
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
                        ) ? {...item, background: 'dark'}: item)))
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

    const actualWeekDay = (n) => weekDays[(date.getDay() + n) > 6 ? (date.getDay() + n) - 7: (date.getDay() + n)];
    const actualDay = (n) => date.getDate() + n;   
    const actualMonth = () => months[date.getMonth()];
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
                                {today}{actualWeekDay(i)}, {actualDay(i)} {actualMonth()}
                                
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