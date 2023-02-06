import { useState, useEffect, useContext } from 'react';
import useWeatherService from '../../service/WeatherService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import { Context } from '../../service/Context';
import { _modifyCityName } from '../../utils';

import './cityInfo.scss';


const CityInfo = ({city, setCityCoord, loading, error}) => {
    const [prevCity, setPrevCity] = useState({});
    const countriesAbbr = useContext(Context);
    const {getCity, clearError, setProcess, process, getCountries} = useWeatherService();

    
    
    useEffect(() => {
        setPrevCity(city);
        setCityCoord(city.coord);
        if(localStorage.length < 5 && city.hasOwnProperty('id')) {
            localStorage.setItem(city.city.toLowerCase(), JSON.stringify({
                temp: city.list[0].temp,
                id: city.id,
                country: countriesAbbr.filter(item => Object.keys(item)[0] === city.country)[0][city.country],
                coord: city.coord
            }));
        }else if(city.hasOwnProperty('id')){
            if(Object.values(localStorage).filter(item => JSON.parse(item).id === city.id).length === 0) {
                const firstKey = Object.keys(localStorage)[0];
                localStorage.removeItem(firstKey);
                localStorage.setItem(city.city.toLowerCase(), JSON.stringify({
                    temp: city.list[0].temp, 
                    id: city.id,
                    country: countriesAbbr.filter(item => Object.keys(item)[0] === city.country)[0][city.country],
                    coord: city.coord
                }));
            }
        }
            

    }, [city, prevCity])

    const spinnerContent = loading && <Spinner />;
    const errorContent = error && <Error />;
    const content = (!loading && !error) && View(city, _modifyCityName);
    return (
        <div className="app-weather">
            {spinnerContent}
            {errorContent}
            {content}
        </div>
    )
}

const View = ({sunrise, sunset, city, coord : {lat, lon}, timezone}, modifyCityName) => {
    const date = new Date(new Date().getTime() + timezone);

    const mdfHours = (time) => new Date(time).getUTCHours() < 10 ? `0${new Date(time).getUTCHours()}`: new Date(time).getUTCHours();

    const mdfMinutes = (time) => new Date(time).getMinutes() < 10 ? `0${new Date(time).getMinutes()}`: new Date(time).getMinutes();

    const sunriseTime = `${mdfHours(sunrise)}:${mdfMinutes(sunrise)}`;
    const sunsetTime = `${mdfHours(sunset)}:${mdfMinutes(sunset)}`;

    return (
        <div className="app-weather__header">
            <h1 className="app-weather__title">Погода в {modifyCityName(city)}</h1>
            <p className='app-weather__date'>Местное время: {date.getUTCHours()}:{date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}</p>
            <p className='app-weather__coord'>Широта: {lat.toFixed(2)} Долгота: {lon.toFixed(2)}</p>
            <p className="app-weather__sun">Восход: <span>{sunriseTime}</span> Закат: <span>{sunsetTime}</span></p>
        </div>
    )
}

export default CityInfo;