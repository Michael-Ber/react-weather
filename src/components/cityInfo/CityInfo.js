import { useState, useEffect } from 'react';
import useWeatherService from '../../service/WeatherService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import { countriesAbbr as abbr} from '../../bd/countriesAbbrToRu';
import setContent from '../../utils/setContent';

import './cityInfo.scss';


const CityInfo = ({cityProp}) => {
    const [city, setCity] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const {getCity, clearError, setProcess, process, getCountries, patchCountries} = useWeatherService();
    console.log(Object.keys(abbr).length);

    useEffect(() => {
        // clearError();
        setError(false);
        setLoading(true);
        getCity(cityProp)
			.then(res => setCity(res))
            .then(() => setLoading(false))
            .catch(() => {setError(true); setLoading(false)})
			// .then(() => setProcess('confirmed'))
        // getCountries()
        //     .then(res => res.filter(item => item.country !== '').sort((a,b) => a.country > b.country ? 1 : -1))
        //     .then (res => console.log([...new Set(res.map(item => item.country))]))
        //     .catch(e => console.log(e))
            

    }, [cityProp])

    const spinnerContent = loading && <Spinner />;
    const errorContent = error && <Error />;
    const content = (!loading && !error) && View(city);
    console.log(city);
    return (
        <div className="app-weather">
            {spinnerContent}
            {errorContent}
            {content}
        </div>
    )
}

const View = ({sunrise, sunset, city, coord : {lat, lon}, timezone}) => {
    const date = new Date(new Date().getTime() + timezone);

    const mdfHours = (time) => new Date(time).getUTCHours() < 10 ? `0${new Date(time).getUTCHours()}`: new Date(time).getUTCHours();

    const mdfMinutes = (time) => new Date(time).getMinutes() < 10 ? `0${new Date(time).getMinutes()}`: new Date(time).getMinutes();

    const sunriseTime = `${mdfHours(sunrise)}:${mdfMinutes(sunrise)}`;
    const sunsetTime = `${mdfHours(sunset)}:${mdfMinutes(sunset)}`;

    return (
        <div className="app-weather__header">
            <h1 className="app-weather__title">Погода в {city}</h1>
            <p className='app-weather__date'>Местное время: {date.getUTCHours()}:{date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}</p>
            <p className='app-weather__coord'>Широта: {lat.toFixed(2)} Долгота: {lon.toFixed(2)}</p>
            <p className="app-weather__sun">Восход: <span>{sunriseTime}</span> Закат: <span>{sunsetTime}</span></p>
        </div>
    )
}

export default CityInfo;