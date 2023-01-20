import { useState, useEffect } from 'react';
import useWeatherService from '../../service/WeatherService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import setContent from '../../utils/setContent';
import './todayWeather.scss';

const TodayWeather = () => {
    const [day, setDay] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { getWeather, clearError, setProcess, process} = useWeatherService();
    

    useEffect(() => {
        // clearError();
        getWeather()
			.then(res => setDay(res[0]))
            .then(() => setLoading(false))
            .catch(() => setError(true))
			// .then(() => setProcess('confirmed'))
    }, [])

    const dayWeather = (day) => {
        const {main: {temp, feels, pressure, humidity}} = day;
        const {wind: {speed, deg}} = day;
        return (
            <div className="app-weather__now now-app-weather">
                <div className="now-app-weather__temp">За бортом: <span>{Math.floor(temp)}</span> &#8451;</div>
                <div className="now-app-weather__feels">Ощущается как: <span>{Math.floor(feels)}</span> &#8451;</div>
                <div className="now-app-weather__pressure">Давление: <span>{Math.floor(pressure)}</span> мм.рт.ст</div>
                <div className="now-app-weather__humidity">Влажность: <span>{humidity}</span> %</div>
                <div className="now-app__wind">Ветер: <span>{speed}</span> м/с <span>{deg}</span></div>
            </div>
        )
    }

    const spinnerContent = loading && <Spinner />;
    const errorContent = (!loading && error) && <Error />;
    const content = (!loading && !error) && dayWeather(day);
    

    return (
        <>
            {spinnerContent}
            {errorContent}
            {content}
        </>
    )
};

export default TodayWeather;