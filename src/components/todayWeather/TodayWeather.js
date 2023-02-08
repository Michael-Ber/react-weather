import setContent from '../../utils/setContent';
import './todayWeather.scss';

const TodayWeather = ({weatherArr, process}) => {
    
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

    return (
        <div className={`app-weather__now now-app-weather ${process==='error' && 'app-weather__now_error'}`}>
            {setContent(process, () => dayWeather(weatherArr))}
        </div>
    )
};

export default TodayWeather;