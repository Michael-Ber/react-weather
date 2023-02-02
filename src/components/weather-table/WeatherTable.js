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
    const [weatherArrFiltered, setWeatherArrFiltered] = useState([]);
    const [weatherArrAll, setWeatherArrAll] = useState([]);
    const {getWeather, process, setProcess, clearError} = useWeatherService();

    
    useEffect(() => {
        if(weatherArr && weatherArr.length > 0) {
            setWeatherArrFiltered(
                weatherArr
                        .filter(obj => {
                        return (
                                obj.dt.getHours() % 2 === 0 
                            )
                        })
                        .map(item => (
                            item.dt.getHours() >= 19 || item.dt.getHours() < 9  
                            ) ? {...item, background: 'dark'}: item
                        )
            );
            setWeatherArrAll(
                weatherArr.map(item => (
                    item.dt.getHours() >= 19 || item.dt.getHours() < 9 
                    ) ? {...item, background: 'dark'}: item
                )
            )
        }
    }, [weatherArr])

    const spinnerContent = loading && <Spinner />;
    const errorContent = error && <Error />;
    const content = (!loading && !error) && <View arr={weatherArrFiltered} allData={weatherArrAll}/>;

    return (
        <div className="app-weather__content">
            {spinnerContent}
            {errorContent}
            {content}
        </div>
        
    )
});

const View = ({arr, allData}) => {
    const [tabContent, setTabContent] = useState([1,2,3,4,5,6,7,8]);
    const date = new Date();
    const setColClasses = (weekDay, classes) => {
        const a = weekDay > 6 ? weekDay - 7 : weekDay;
        const [classMain, classWeekend] = classes;
        return (a > 0 && a < 6) ? classMain: classWeekend;
    }

    console.log(allData);

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

    const arrSet = [...new Set(arr.map(item => item.dt.getDate()))]; //123456
    const arrSetFull = [...new Set(allData.map(item => item.dt.getDate()))]; //123456

    const thContent6Days = arrSet.map((item, i, array) => {
        let colspan = 0;
        switch(i) {
            case 0: if(tabContent > 8) {
                        colspan = arr.filter(elem => elem.dt.getDate() === item).length+1
                    }else {
                        colspan = allData.filter(elem => elem.dt.getDate() === item).length+1
                    }; break;
            case 1: if(tabContent > 8) {
                        colspan = arr.filter(elem => elem.dt.getDate() === item).length
                    }else {
                        colspan = allData.filter(elem => elem.dt.getDate() === item).length
                    }; break;
            case 2: if(tabContent > 8) {
                        colspan = arr.filter(elem => elem.dt.getDate() === item).length
                    }else {
                        colspan = allData.filter(elem => elem.dt.getDate() === item).length
                    }; break;
            case 3: if(tabContent > 8) {
                        colspan = arr.filter(elem => elem.dt.getDate() === item).length
                    }else {
                        colspan = allData.filter(elem => elem.dt.getDate() === item).length
                    }; break;
            case 4: if(tabContent > 8) {
                        colspan = arr.filter(elem => elem.dt.getDate() === item).length
                    }else {
                        colspan = allData.filter(elem => elem.dt.getDate() === item).length
                    }; break;
            case 5: if(tabContent > 8) {
                        colspan = arr.filter(elem => elem.dt.getDate() === item).length
                    }else {
                        colspan = allData.filter(elem => elem.dt.getDate() === item).length
                    }; break;
            
            default: colspan = 0
        }
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
    // const thContent6Days = arrSet.map((item, i, array) => {
    //     let colspan = (i === 0 && array.length < 6) ? 5 : (i === 0 && array.length > 5) ? 3 : 4;
    //     let today = i === 0 ? 'Сегодня, ' : i === 1 ? 'Завтра, ': null;
    //     return (
    //         <th 
    //             key={i} 
    //             scope="col" 
    //             colSpan={colspan}  
    //             className={setColClasses(date.getDay()+i, ['col-head', 'col-head col-head_weekend'])}>
    //             {today}{actualWeekDay(i)}, {actualDay(i)} {actualMonth(i)}
                
    //         </th>
    //     )
    // })
    // const trContentFullDays = arrSetFull.map((item, i, array) => {
    //     let colspan = i === 0 ? tabContent.length + 1 : tabContent.length; 
    //     let today = i === 0 ? 'Сегодня, ' : i === 1 ? 'Завтра, ': null;
    //     return (
    //         <th 
    //             key={i} 
    //             scope="col" 
    //             colSpan={colspan}  
    //             className={setColClasses(date.getDay()+i, ['col-head', 'col-head col-head_weekend'])}>
    //             {today}{actualWeekDay(i)}, {actualDay(i)} {actualMonth(i)}
                
    //         </th>
    //     )
    // })

    const tabItem = arrSet.map((item, i) => {
        let today = i === 0 ? 'Сегодня, ' : i === 1 ? 'Завтра, ': null;
        return (
            <li 
                key={i} 
                onClick={(e) => {
                    const t = document.querySelectorAll('.col-head')[i];
                    setTabContent(allData.filter(elem => elem.dt.getDate() === item).length); console.log(item, t.closest('.app-weather__table'));
                    t.closest('.tabs__content').scrollLeft = t.offsetLeft;
                }}
                className={setColClasses(date.getDay()+i, ['tabs__item', 'tabs__item tabs__item_weekend'])}>
                <p>{today}{actualWeekDay(i)}</p>
            </li>
        )
    }) 

    return (
        <div className="app-weather__tabs tabs">
            <div className="tabs__triggers">
                <ul className="tabs__list">
                    <li
                        className="tabs__item tabs__item_active"
                        onClick={() => {setTabContent(arr.length)}}><p>6 суток</p></li>
                    {tabItem}
                </ul>
            </div>
            <div className="tabs__content">
                <table className="app-weather__table">
                    <thead>
                        {/* формирование строки с днями недели, месяцем и числами */}
                        <tr className="row"> 
                            {thContent6Days}
                        </tr>

                    </thead>
                    <tbody>
                        {colsName.map((item, j) => { //array
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
                                    {tabContent > 8 ? arr.map(item => {return <Comp key={item.id} item={item}/>}): allData.map(item => {return <Comp key={item.id} item={item}/>})}
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

