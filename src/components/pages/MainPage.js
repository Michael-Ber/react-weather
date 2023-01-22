import CityInfo from "../cityInfo/CityInfo";
import TodayWeather from "../todayWeather/TodayWeather";
import WeatherTable from "../weather-table/WeatherTable";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import './mainPage.scss';

const MainPage = ({cityProp}) => {
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

export default MainPage;