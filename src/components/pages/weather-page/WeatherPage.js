import CityInfo from "../../cityInfo/CityInfo";
import TodayWeather from "../../todayWeather/TodayWeather";
import WeatherTable from "../../weather-table/WeatherTable";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import { useEffect, useState } from "react";
import { useNavigate, redirect, useLocation } from "react-router-dom";
import useForceUpdate from "../../../hooks/useForceUpdate.hook";


const WeatherPage = ({cityProp, match}) => {
    const nav = useNavigate();
    return (
        <div className="main-page">
            <ErrorBoundary>
                <CityInfo cityProp={cityProp}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <TodayWeather cityProp={cityProp}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <WeatherTable cityProp={cityProp}/>
            </ErrorBoundary>
        </div>
    )
}

export default WeatherPage;