import { useContext, useEffect } from "react";
import { Context } from "../../service/Context";
import useWeatherService from "../../service/WeatherService";

const CountryPage = ({country}) => {
    const abbr = useContext(Context);
    const {getCountries} = useWeatherService();
    console.log(abbr)
    // useEffect(() => {
        
    // }, [])
};
export default CountryPage;