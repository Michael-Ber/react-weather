import { useHttp } from "../hooks/http.hook";
import { v4 as uuidv4 } from 'uuid';

const useWeatherService = () => {
    const {request, clearError, process, setProcess} = useHttp();
    const _apiKey = '60821d8da82efddc7040a50bc511c640';
    const _url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${_apiKey}&lang=ru&units=metric&q=`;
    // const _url1 = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${_apiKey}&lang=ru&units=metric&q=af`;

    const getCity = async(query) => {
        const res = await request(`${_url}${query}`);
        return {
            id: res.city.id,
            city: modifyCityName(res.city.name),
            coord: {
                lat: res.city.coord.lat,
                lon: res.city.coord.lon
            },
            timezone: res.city.timezone*1000,
            sunrise: (res.city.sunrise*1000 + res.city.timezone*1000),
            sunset: (res.city.sunset*1000 + res.city.timezone*1000)
        }
    };

    const getWeather = async(query) => {
        const res = await request(`${_url}${query}`);
        return res.list.map(_transformData)
    }

    const getCountries = async(countryAbbr) => {
        const res = await request('http://localhost:3004/data');
        return res.filter(item => item.country === countryAbbr)
    }

    

    const patchCountries = async(body, id) => {
        const res = await request(`http://localhost:3004/data/${id}`, 
            'PATCH',
            JSON.stringify(body),
            {'Content-Type': 'application/json'}
        )
        return res
    }
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
    const modifyCityName = (name) => {
        let arr = name.split('');
        let lastLiteral = arr.splice(-1, 1);
        switch(lastLiteral.join('')) {
            case 'й': 
                // arr.splice(-2, 2);
                let secondLiteral = arr.splice(-1, 1);
                console.log(secondLiteral);
                secondLiteral[0] === 'и' ? arr.push('ом'): arr.push('ее');
                return arr.join('');
            case 'а': 
                arr.push('е');
                return arr.join('');
            case 'о':
                arr.push(lastLiteral);
                return arr.join('');
            default: 
                arr.push(lastLiteral, 'e');
                return arr.join('')
        } 
    }
    return {getCity, getWeather, process, setProcess, clearError, modifyCityName, getCountries, patchCountries}
}


export default useWeatherService;