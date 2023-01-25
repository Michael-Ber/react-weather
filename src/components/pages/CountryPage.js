import { useContext, useEffect } from "react";
import { Context } from "../../service/Context";
import useWeatherService from "../../service/WeatherService";

const CountryPage = ({countryAbbr}) => {
    const abbr = useContext(Context);
    const {getCountries} = useWeatherService();
    useEffect(() => {
        getCountries(countryAbbr)
            .then(res => console.log(res))
    }, [])
};
export default CountryPage;