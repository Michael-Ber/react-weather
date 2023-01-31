import useWeatherService from '../../service/WeatherService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import './todayWeather.scss';

const TodayWeather = ({weatherArr, loading, error}) => {
    const { clearError, setProcess, process} = useWeatherService();
    console.log(weatherArr);
    
    const dayWeather = (day) => {
        const {main: {temp, feels, pressure, humidity}} = day;
        const {wind: {speed, deg}} = day;
        return (
            <>
                <div className="now-app-weather__temp">За бортом: <span>{Math.floor(temp)}</span> &#8451;</div>
                <div className="now-app-weather__feels">Ощущается как: <span>{Math.floor(feels)}</span> &#8451;</div>
                <div className="now-app-weather__pressure">Давление: <span>{Math.floor(pressure)}</span> мм.рт.ст</div>
                <div className="now-app-weather__humidity">Влажность: <span>{humidity}</span> %</div>
                <div className="now-app__wind">Ветер: <span>{speed}</span> м/с <span>{deg}</span></div>
            </>
        )
    }

    const spinnerContent = loading && <Spinner />;
    const errorContent = error && <Error />;
    const content = (!loading && !error) && dayWeather(weatherArr);
    

    return (
        <div className="app-weather__now now-app-weather">
            {spinnerContent}
            {errorContent}
            {content}
        </div>
    )
};

export default TodayWeather;