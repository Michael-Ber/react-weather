import CityInfo from "../cityInfo/CityInfo";
import TodayWeather from "../todayWeather/TodayWeather";
import WeatherTable from "../weather-table/WeatherTable";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { useEffect, useState } from "react";
import { useNavigate, redirect, useLocation } from "react-router-dom";
import useForceUpdate from "../../hooks/useForceUpdate.hook";

import './mainPage.scss';

const MainPage = () => {
    return (
        <div className="main-page">
            <ErrorBoundary>
            </ErrorBoundary>
            
        </div>
    )
}

export default MainPage;