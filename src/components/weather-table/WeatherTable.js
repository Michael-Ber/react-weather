import { useEffect, useState } from "react";
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

import {setActiveClassForTab} from '../../utils/_setActiveClassForTab';

import './weatherTable.scss';
import setContent from "../../utils/setContent";

const WeatherTable = ({weatherArr, process}) => {
    const [weatherArrFiltered, setWeatherArrFiltered] = useState([]);
    const [weatherArrAll, setWeatherArrAll] = useState([]);
    const [arraysDone, setArraysDone] = useState(false);

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

    useEffect(() => {
        if(weatherArrFiltered.length === 0 && weatherArrAll.length === 0) {
            setArraysDone(false);
        }else {
            setArraysDone(true);
        }
    }, [weatherArrFiltered, weatherArrAll])

    return (
        <div className="app-weather__content">
            {arraysDone && setContent(process, View, {arr: weatherArrFiltered, allData: weatherArrAll})}
        </div>
        
    )
};

const View = ({data}) => {
    const {arr} = data;
    const {allData} = data;
    const [tabContent, setTabContent] = useState(10);
    const date = new Date();
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

    const arrSet = [...new Set(arr.map(item => item.dt.getDate()))]; //123456

    const thContent6Days = arrSet.map((item, i) => {
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

    const tabItem = arrSet.map((item, i) => {
        let today = i === 0 ? <span>Сегодня,</span>  : i === 1 ? <span>Завтра,</span>: null;
        return (
            <li 
                key={i} 
                onClick={(e) => {

                    return new Promise(resolve => {
                        setTabContent(allData.filter(elem => elem.dt.getDate() === item).length);
                        setActiveClassForTab(e.target, 'tabs__list', 'tabs__item', 'tabs__item_active');
                        resolve(true); 
                    })
                    .then (() => {
                        const t = document.querySelectorAll('.col-head')[i];
                        t.closest('.tabs__content').scrollLeft = t.offsetLeft;
                    })
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
                        onClick={(e) => {
                            setTabContent(arr.length);
                            setActiveClassForTab(e.target, 'tabs__list', 'tabs__item', 'tabs__item_active');
                            }}>
                                <p>6 суток</p>
                    </li>
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
                            const deg = (typeof(item[0]) === 'string' && item[0].match(/[&#8451;]/g)) ? item[0].replace(/[&#8451;]/g, '') : null;
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

