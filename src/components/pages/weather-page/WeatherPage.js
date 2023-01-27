import CityInfo from "../../cityInfo/CityInfo";
import TodayWeather from "../../todayWeather/TodayWeather";
import WeatherTable from "../../weather-table/WeatherTable";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import { useParams, useNavigate } from "react-router-dom";


const WeatherPage = () => {
    const {cityName} = useParams();
    return (
        <div className="main-page">
            <ErrorBoundary>
                <CityInfo cityProp={cityName}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <TodayWeather cityProp={cityName}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <WeatherTable cityProp={cityName}/>
            </ErrorBoundary>
        </div>
    )
}

export default WeatherPage;