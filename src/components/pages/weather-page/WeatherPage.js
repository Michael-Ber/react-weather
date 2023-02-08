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
    const countriesArr = useContext(Context);
    const {getData, process, setProcess} = useWeatherService();
    const query = `${cityName},${_modifyCountryToEng(countryName, countriesArr)}`;
    
    useEffect(() => {
        getData(query)
            .then(res => {setCity(_transformCity(res)); return res})
            .then(res => setWeatherArr(res.list.map(item => _transformData(item, res.city.timezone))))
            .then(() => setProcess('confirmed'))
            .catch(e => { setProcess('error'); console.log(e);throw new Error(e)})

    }, [query])
    return (
        <div className="main-page">
            <ErrorBoundary>
                <CityInfo city={city} setCityCoord={setCityCoord} process={process}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <TodayWeather process={process} weatherArr={weatherArr[0]}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <WeatherTable process={process} weatherArr={weatherArr}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <Footer process={process} cityCoord={cityCoord}/>
            </ErrorBoundary>
        </div>
    )
}

export default WeatherPage;