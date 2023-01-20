import { useHttp } from "../hooks/http.hook";
import { v4 as uuidv4 } from 'uuid';

const useWeatherService = () => {
    const {request, clearError, process, setProcess} = useHttp();
    const _apiKey = '60821d8da82efddc7040a50bc511c640';
    const _url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${_apiKey}&lang=ru&units=metric&q=Bratsk`;
    
    const getCity = async() => {
        const res = await request(_url);
        return {
            id: res.city.id,
            city: res.city.name,
            coord: {
                lat: res.city.coord.lat,
                lon: res.city.coord.lon
            },
            sunrise: new Date(res.city.sunrise*1000),
            sunset: new Date(res.city.sunset*1000)
        }
    };

    const getWeather = async() => {
        const res = await request(_url);
        return res.list.map(_transformData)
    }

    // const getInfo = async() => {
    //     const res = await request(_url);
    //     return {city: res.city, list: res.list};
    // }

    const _transformWindDirection = (deg) => {
        if(deg<20 || deg>=330) {
            return 'С' 
        }else if(deg>=20 && deg<=75) {
            return 'С-В'
        }else if(deg>75 && deg<105) {
            return 'В'
        }else if(deg>=105 && deg<150) {
            return 'Ю-В' 
        }else if(deg>=150 && deg<210) {
            return 'Ю'
        }else if(deg>=210 && deg<240) {
            return 'Ю-З'
        }else if(deg>=240 && deg<300) {
            return 'З'
        }else if(deg>=300 && deg<330) {
            return 'С-З'
        }else {
            return ''
        }
    }

    const _transformData = (data) => ({
        id: uuidv4(),
        dt: new Date(data.dt*1000),
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

    })
    return {getCity, getWeather, process, setProcess, clearError}
}

export default useWeatherService;