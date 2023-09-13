import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../service/Context';
import { _modifyCityName } from '../../utils';
import { memo } from 'react';
import './cityInfo.scss';
import setContent from '../../utils/setContent';


const CityInfo = memo(({city, process}) => {
    const [prevCity, setPrevCity] = useState({});
    const countriesAbbr = useContext(Context);
    const {countryName} = useParams();
    useEffect(() => {
        setPrevCity(city);
        // setCityCoord(city.coord);
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

    return (
        <div className="app-weather">
            {setContent(process, View, {city, _modifyCityName, countryName})}
        </div>
    )
})

const View = ({data}) => {
    const {sunrise, sunset, city, coord : {lat, lon}, timezone} = data.city;
    const {_modifyCityName, countryName} = data;
    const date = new Date(new Date().getTime() + timezone);
    const mdfHours = (time) => new Date(time).getUTCHours() < 10 ? `0${new Date(time).getUTCHours()}`: new Date(time).getUTCHours();

    const mdfMinutes = (time) => new Date(time).getMinutes() < 10 ? `0${new Date(time).getMinutes()}`: new Date(time).getMinutes();

    const sunriseTime = `${mdfHours(sunrise)}:${mdfMinutes(sunrise)}`;
    const sunsetTime = `${mdfHours(sunset)}:${mdfMinutes(sunset)}`;

    return (
        <div className="app-weather__wrapper">
            <div className="app-weather__links">
                <Link to={'/Все_страны'}>Все страны</Link> {'->'}
                <Link to={`/${countryName}`}>{countryName}</Link>

            </div>
            <div className="app-weather__header">
                <h1 className="app-weather__title">Погода в {_modifyCityName(city)}</h1>
                <p className='app-weather__date'>Местное время: {date.getUTCHours()}:{date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}</p>
                <p className='app-weather__coord'>Широта: {lat.toFixed(2)} Долгота: {lon.toFixed(2)}</p>
                <p className="app-weather__sun">Восход: <span>{sunriseTime}</span> Закат: <span>{sunsetTime}</span></p>
            </div>
        </div>
    )
}

export default CityInfo;