import useWeatherService from '../../service/WeatherService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import './todayWeather.scss';

const TodayWeather = ({weatherArr, loading, error}) => {
    const { clearError, setProcess, process} = useWeatherService();
    
    const dayWeather = (day) => {
        const {main: {temp, feels, pressure, humidity}} = day;
        const {wind: {speed, deg}} = day;
        return (
            <>
                <div className="now-app-weather__temp"><p><span>{Math.floor(temp)}</span> &#8451;</p></div>
                <div className="now-app-weather__feels"><p>Ощущается как: <span>{Math.floor(feels)}</span> &#8451;</p></div>
                <div className="now-app-weather__pressure"><p>Давление: <span>{Math.floor(pressure)}</span> мм.рт.ст</p></div>
                <div className="now-app-weather__humidity"><p>Влажность: <span>{humidity}</span> %</p></div>
                <div className="now-app__wind"><p>Ветер: <span>{speed}</span> м/с <span>{deg}</span></p></div>
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