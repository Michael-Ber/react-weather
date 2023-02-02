import _transformWindDirection from './_transformWindDirection';
import { v4 as uuidv4 } from 'uuid';

const _transformData = (data, timezone) => {
    return {
    id: uuidv4(),
    dt: new Date(data.dt * 1000 + timezone*1000 + new Date().getTimezoneOffset() * 60 * 1000),
    dt_txt: data.dt_txt,
    clouds: data.clouds.all,
    weather: data.weather[0].description,
    icon: data.weather[0].icon,
    visibility: data.visibility,
    wind: {
        speed: Math.ceil(data.wind.speed),
        deg: _transformWindDirection(data.wind.deg),
        gust: Math.ceil(data.wind.gust)
    },
    main: {
        temp: data.main.temp,
        feels: data.main.feels_like,
        pressure: data.main.grnd_level * 0.75,
        humidity: data.main.humidity
    }
}
}

export default _transformData;