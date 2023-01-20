import CityInfo from "../cityInfo/CityInfo";
import TodayWeather from "../todayWeather/TodayWeather";
import WeatherTable from "../weather-table/WeatherTable";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import './mainPage.scss';

const MainPage = () => {
    return (
        <div className="main-page">
            <ErrorBoundary>
                <CityInfo />
            </ErrorBoundary>
            <ErrorBoundary>
                <TodayWeather />
            </ErrorBoundary>
            <ErrorBoundary>
                <WeatherTable />
            </ErrorBoundary>
        </div>
    )
}

export default MainPage;