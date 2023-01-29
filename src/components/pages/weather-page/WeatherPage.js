import CityInfo from "../../cityInfo/CityInfo";
import TodayWeather from "../../todayWeather/TodayWeather";
import WeatherTable from "../../weather-table/WeatherTable";
import Footer from "../../footer/Footer";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import { useState } from "react";
import { useParams } from "react-router-dom";


const WeatherPage = () => {
    const {cityName} = useParams();
    // const [locStor, setLocStor] = useState({});
    // console.log(locStor);
    return (
        <div className="main-page">
            <ErrorBoundary>
                <CityInfo cityProp={cityName} />
            </ErrorBoundary>
            <ErrorBoundary>
                <TodayWeather cityProp={cityName}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <WeatherTable cityProp={cityName}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <Footer/>
            </ErrorBoundary>
        </div>
    )
}

export default WeatherPage;