import { useHttp } from "../hooks/http.hook";

const useWeatherService = () => {
    const {request, clearError, process, setProcess} = useHttp();
    const _apiKey = '60821d8da82efddc7040a50bc511c640';
    const _url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${_apiKey}&lang=ru&units=metric&q=`;

    const getData = async(query) => {
        const res = await request(`${_url}${query}`);
        return res;
    }

    const getCountries = async(countryAbbr) => {
        const res = await request('http://localhost:3004/data');
        return _transformCountryCities(res, countryAbbr);
    }

    const getCities = async() => {
        const res = await request('http://localhost:3004/data');
        return res
    }

    const _transformCountryCities = (data, countryAbbr) => {
        let res = [];
        let dataSorted = data
                            .filter(item => item.country === countryAbbr)
                            .sort((a,b) => a.name > b.name ? 1 : -1);

        const alphabet = ['A', 'B', 'C',  'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        res.push(
            ...alphabet.map(lit => {
                return dataSorted
                        .filter(item => item.name[0] === lit)
            })
        )
        return res
    }

    return {process, setProcess, clearError, getCountries, getCities, getData}
}


export default useWeatherService;