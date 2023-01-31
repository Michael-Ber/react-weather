import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from '../../service/Context';
import useWeatherService from "../../service/WeatherService";
import { _transformCity } from "../../utils";
import Spinner from "../spinner/Spinner";

const LiItem = ({city}) => {
    const [nearlyTemp, setNearlyTemp] = useState([]);
    const {getData} = useWeatherService();
    const countries = useContext(Context);
    const {name, country} = city;

    useEffect(() => {
        getData(name, country)
            .then(res => _transformCity(res))
            .then(res => setNearlyTemp(arr => {
                return arr.filter(item => item.city === res.city).length === 0 ? [...arr, res] : [...arr]
            }))
            .catch(e => console.log(e))
    }, [])

    
    const tempClassName = (temp) => 
        temp < -27 ? 'footer-app__temp footer-app__temp_very-cold' :
        temp < -15 ? 'footer-app__temp footer-app__temp_cold' :
        temp < 0 ? 'footer-app__temp footer-app__temp_middle' : 
        temp >= 0 ? 'footer-app__temp footer-app__temp_pos' : 
        temp > 25 ? 'footer-app__temp footer-app__temp_hot' : 
        temp > 35 ? 'footer-app__temp footer-app__temp_heat' : 'footer-app__temp';
    
    const temp = nearlyTemp.length > 0 ? nearlyTemp[0].list[0].temp : null;
    const link = nearlyTemp.length > 0? <Link 
                                                to={`/${country}/${name}`}
                                                className='footer-app__link'>{nearlyTemp[0].city} ({countries.filter(item => item[country])[0][country]})
                                            </Link>: <Spinner />
    return (
        <li className='footer-app__item'>
            <span className={tempClassName(temp)}>{temp}</span> 
            {link}
        </li>
    )
}
export default LiItem;