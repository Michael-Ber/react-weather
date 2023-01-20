import { useState, useEffect } from 'react';
import useWeatherService from '../../service/WeatherService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import setContent from '../../utils/setContent';

import './cityInfo.scss';

const CityInfo = ({data}) => {
    const [city, setCity] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const {getCity, clearError, setProcess, process} = useWeatherService();
    

    useEffect(() => {
        // clearError();
        getCity()
			.then(res => setCity(res))
            .then(() => setLoading(false))
            .catch(() => setError(true))
			// .then(() => setProcess('confirmed'))
    }, [])


    const cityInfo = ({sunrise, sunset, city, coord : {lat, lon}}) => {
        const date = new Date();

        const sunriseTime = `${new Date(sunrise).getHours()}:${new Date(sunrise).getMinutes()}`;
        const sunsetTime = `${new Date(sunset).getHours()}:${new Date(sunset).getMinutes()}`;

        return (
            <div className="app-weather__header">
                <h1 className="app-weather__title">Погода в {city}е</h1>
                <p className='app-weather__date'>Местное время: {date.getHours()}:{date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}</p>
                <p className='app-weather__coord'>Широта: {lat.toFixed(2)} Долгота: {lon.toFixed(2)}</p>
                <p className="app-weather__sun">Восход: <span>{sunriseTime}</span> Закат: <span>{sunsetTime}</span></p>
            </div>
        )
    }

    const spinnerContent = loading && <Spinner />;
    const errorContent = (!loading && error) && <Error />;
    const content = (!loading && !error) && cityInfo(city);

    
    // const {main : {temp, feels, humidity, pressure}, weather, wind: {speed, gust, deg}} = days[0];
    
    return (
        <div className="app-weather">
            {spinnerContent}
            {errorContent}
            {content}
        </div>
    )
}

export default CityInfo;