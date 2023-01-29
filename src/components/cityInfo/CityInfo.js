import { useState, useEffect, useContext } from 'react';
import useWeatherService from '../../service/WeatherService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import { Context } from '../../service/Context';
import setContent from '../../utils/setContent';

import './cityInfo.scss';


const CityInfo = ({cityProp, setLocStor}) => {
    const [city, setCity] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [earlyCities, setEalryCities] = useState([]);
    const countriesAbbr = useContext(Context);
    const {getCity, modifyCityName, clearError, setProcess, process, getCountries} = useWeatherService();

    useEffect(() => {
        earlyCities.map(item => localStorage.setItem(item.city, JSON.stringify({
            country: item.country,
            id: item.id, 
            temp: item.list[0].temp
        })))
    }, [earlyCities])
    
    useEffect(() => {
        // clearError();
        setError(false);
        setLoading(true);
        getCity(cityProp)
			.then(res => {setCity(res); return res})
            .then(res => {
                
                if(localStorage.length < 4) {
                    localStorage.setItem(res.city, JSON.stringify({
                        temp: res.list[0].temp,
                        id: res.id,
                        country: countriesAbbr.filter(item => Object.keys(item)[0] === res.country)[0][res.country]
                    }));
                }else {
                    if(Object.values(localStorage).filter(item => JSON.parse(item).id === res.id).length !== 0) {
                        console.log('nothing to do here');
                    }else {
                            const firstKey = Object.keys(localStorage)[0];
                            console.log(firstKey);
                            localStorage.removeItem(firstKey);
                            localStorage.setItem(res.city, JSON.stringify({
                                temp: res.list[0].temp, 
                                id: res.id,
                                country: countriesAbbr.filter(item => Object.keys(item)[0] === res.country)[0][res.country]
                            }));
                        
                        
                    }
                }
                
            })
            .then(() => console.log(localStorage))
            .then(() => setLoading(false))
            .catch((e) => {setError(true); setLoading(false); console.log(e)})
            

    }, [cityProp])

    const spinnerContent = loading && <Spinner />;
    const errorContent = error && <Error />;
    const content = (!loading && !error) && View(city, modifyCityName);
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