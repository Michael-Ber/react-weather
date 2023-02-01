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
    const [weatherArrAll, setWeatherArrAll] = useState([]);
    const {getWeather, process, setProcess, clearError} = useWeatherService();

    useEffect(() => {
        onUpdateTime();
    }, [])
    useEffect(() => {
        if(weatherArr && weatherArr.length > 0) {
            setWeatherArrFiltered(
                weatherArr.filter(obj => {
                    console.log(new Date(obj.dt).getUTCHours());
                        return (
                                new Date(obj.dt).getUTCHours() === 14 
                                || new Date(obj.dt).getUTCHours() === 20 
                                || new Date(obj.dt).getUTCHours() === 2 
                                || new Date(obj.dt).getUTCHours() === 8
                            )
                        })
                        .map(item => (
                            new Date(item.dt).getUTCHours() === 20 || 
                            new Date(item.dt).getUTCHours() === 2 ||
                            new Date(item.dt).getUTCHours() === 8
                            ) ? {...item, background: 'dark'}: item
                        )
            );
            setWeatherArrAll(
                weatherArr.map(item => (
                    new Date(item.dt).getUTCHours() === 20 || 
                    new Date(item.dt).getUTCHours() === 2 ||
                    new Date(item.dt).getUTCHours() === 8
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
    const content = (!loading && !error) && <View date={date} arr={weatherArrFiltered} allData={weatherArrAll}/>;

    console.log(weatherArrFiltered)
    return (
        <div className="app-weather__content">
            {spinnerContent}
            {errorContent}
            {content}
        </div>
        
    )
});

const View = ({date, arr, allData}) => {
    const setColClasses = (weekDay, classes) => {
        const a = weekDay > 6 ? weekDay - 7 : weekDay;
        const [classMain, classWeekend] = classes;
        return (a > 0 && a < 6) ? classMain: classWeekend;
    }

    const actualWeekDay = (n) => _changeWeek(date, n);
    const actualDay = (n) => _changeDayMonth(date, n, 'day');  
    const actualMonth = (m) => _changeDayMonth(date, m, 'month');

    const colsName = [
        ['Местное время', TimeCol], 
        ['Облачность, %', SkyCol], 
        ['Температура, &#8451;', TempCol], 
        ['Ощущается как, &#8451;', FeelsCol], 
        ['Давление, мм.рт.ст', PressureCol], 
        [['Ветер, скорость м/с', 'порывы м/с', 'направление'], WindCol], 
        ['Влажность, %', HumidityCol]
    ];

    const arrSet = [...new Set(arr.map(item => new Date(item.dt).getDate()))];
    const trContentFull = arrSet.map((item, i) => {
        let colspan = i === 0 ? 3 : 4;
        let today = i === 0 ? 'Сегодня, ' : i === 1 ? 'Завтра, ': null;
        return (
            <th 
                key={i} 
                scope="col" 
                colSpan={colspan}  
                className={setColClasses(date.getDay()+i, ['col-head', 'col-head col-head_weekend'])}>
                {today}{actualWeekDay(i)}, {actualDay(i)} {actualMonth(i)}
                
            </th>
        )
    })

    const tabItem = arrSet.map((item, i) => {
        let today = i === 0 ? 'Сегодня, ' : i === 1 ? 'Завтра, ': null;
        return (
            <li 
                key={i} 
                onClick={() => console.log(allData.filter(elem => new Date(elem.dt).getDay() === item))}
                className={setColClasses(date.getDay()+i, ['tabs__item', 'tabs__item tabs__item_weekend'])}>
                <p>{today}{actualWeekDay(i)}</p>
            </li>
        )
    }) 

    console.log(arr);
    return (
        <div className="app-weather__tabs tabs">
            <div className="tabs__triggers">
                <ul className="tabs__list">
                    <li
                        className="tabs__item tabs__item_active"
                        onClick={() =>  {}}><p>6 суток</p></li>
                    {tabItem}
                </ul>
            </div>
            <div className="tabs__content">
                <table className="app-weather__table">
                    <thead>
                        {/* формирование строки с днями недели, месяцем и числами */}
                        <tr className="row"> 
                            {trContentFull}
                        </tr>

                    </thead>
                    <tbody>
                        {colsName.map((item, j, array) => { //array
                            const Comp = item[1];
                            const deg = typeof(item[0]) === 'string' && item[0].replace(/[&#8451;]/g, '');
                            
                            return (
                                <tr key={j} className="row" >
                                    <td className="col-body col-body_side">
                                        {(typeof(item[0]) !== 'object' && !deg) ? 
                                        <p className="tar">{item[0]}</p> : 
                                        (typeof(item[0]) !== 'object' && deg) ? 
                                        <p className="tar">{deg}&#8451;</p> : 
                                        item[0].map((elem, k) => <p key={k} className="tar">{elem}</p>)}
                                    </td>
                                    {arr.map(item => {return <Comp key={item.id} item={item}/>})}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WeatherTable;

