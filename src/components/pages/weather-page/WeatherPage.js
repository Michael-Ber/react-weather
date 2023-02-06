import CityInfo from "../../cityInfo/CityInfo";
import TodayWeather from "../../todayWeather/TodayWeather";
import WeatherTable from "../../weather-table/WeatherTable";
import Footer from "../../footer/Footer";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import useWeatherService from "../../../service/WeatherService";
import { Context } from "../../../service/Context";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { _transformCity, _transformData, _modifyCountryToEng } from "../../../utils";


const WeatherPage = () => {
    const {cityName, countryName} = useParams();
    const [cityCoord, setCityCoord] = useState({});
    const [city, setCity] = useState({});
    const [weatherArr, setWeatherArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const countriesArr = useContext(Context);
    const {getData} = useWeatherService();
    const query = `${cityName},${_modifyCountryToEng(countryName, countriesArr)}`;

    useEffect(() => {
        setLoading(true);
        getData(query)
            .then(res => {setCity(_transformCity(res)); return res})
            .then(res => setWeatherArr(res.list.map(item => _transformData(item, res.city.timezone))))
            .then(() => setLoading(false))
            .catch(e => {console.log(e); setError(true)})
    }, [query])
 
    return (
        <div className="main-page">
            <ErrorBoundary>
                <CityInfo loading={loading} error={error} city={city} setCityCoord={setCityCoord}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <TodayWeather loading={loading} error={error} weatherArr={weatherArr[0]}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <WeatherTable loading={loading} error={error} weatherArr={weatherArr}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <Footer loading={loading} error={error} cityCoord={cityCoord}/>
            </ErrorBoundary>
        </div>
    )
}

export default WeatherPage;