import CityInfo from "../cityInfo/CityInfo";
import TodayWeather from "../todayWeather/TodayWeather";
import WeatherTable from "../weather-table/WeatherTable";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { Context } from "../../service/Context";
import { useEffect, useState, useContext } from "react";
import { useNavigate, redirect, useLocation, Link } from "react-router-dom";
import useForceUpdate from "../../hooks/useForceUpdate.hook";

import './mainPage.scss';

const MainPage = ({setCountry}) => {
    const abbr = useContext(Context);
    const arr = abbr.map(item => Array.from(Object.values(item))[0]).sort((a,b) => a > b ? 1 : -1);
    const upperLiteralCountry = [...new Set(arr.map(item => item[0]))];
    const content = upperLiteralCountry.map((item, i) => {
        return (
            <li key={i} className="main-page__item item-main-page">
                <p className="item-main-page__header">{item}</p> {/*Country Literal*/}
                <ul className="item-main-page__sublist">
                    {arr
                        .filter(country => country[0] === item)
                        .map((item, j) => 
                            <li className="item-main-page__subitem" key={j}> {/*Country*/}
                                <Link 
                                    onClick={
                                        () => setCountry(item)} 
                                    to={`/${item}`} 
                                    className="item-main-page__link">
                                    {item}
                                </Link>
                            </li>
                            )
                    }
                </ul>
            </li>
        )
    })
    return (
        <ErrorBoundary>
            <div className="main-page">
                <ul className="main-page__list">
                    {content}
                </ul>
            </div>
        </ErrorBoundary>
    )
}

export default MainPage;