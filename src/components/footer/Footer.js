import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NearlyLiItem from './NearlyLiItem';
import useWeatherService from '../../service/WeatherService';
import './footer.scss';

const Footer = ({cityCoord}) => {

    const [obj, setObj] = useState({});
    const [nearly, setNearly] = useState([]);
    const {cityName} = useParams();
    const {cloneGetCities} = useWeatherService();

    useEffect(() => {
        setObj(localStorage)
    }, [localStorage])

    useEffect(() => {
        setNearly([]);
        let nearlyCoordinatesArr = cityCoord && [...Array(4)].map((item, i) => {
            const {lat, lon} = cityCoord;
            switch(i) {
                case 0: item = {lat: lat + 1, lon: lon + 1}; return item;
                case 1: item = { lat: lat - i, lon: lon + i }; return item;
                case 2: item = { lat: lat + i, lon: lon - i }; return item;
                case 3: item = { lat: lat - i, lon: lon - i }; return item;
                default: return {}
            }
        });

        const getNearCitiesInfo = async(arr) => {
            if(arr[0]['lat']) {
                for await(const coord of arr) {
                    cloneGetCities(coord)   
                        .then(res => setNearly(state => ([...state, res])))
                        .catch((eer) => console.log(eer)) 
                }
            }
        }
        getNearCitiesInfo(nearlyCoordinatesArr)

    }, [cityCoord])

    const tempClassName = (temp) => 
        temp < -27 ? 'footer-app__temp footer-app__temp_very-cold' :
        temp < -15 ? 'footer-app__temp footer-app__temp_cold' :
        temp < 0 ? 'footer-app__temp footer-app__temp_middle' : 
        temp >= 0 ? 'footer-app__temp footer-app__temp_pos' : 
        temp > 25 ? 'footer-app__temp footer-app__temp_hot' : 
        temp > 35 ? 'footer-app__temp footer-app__temp_heat' : 'footer-app__temp';

    const earlyItems = obj && Object.keys(obj)
                    .filter(item => item !== cityName)
                    .map((item, i) => {
                        if(i < 4) {
                            const {id} = JSON.parse(obj[item]);
                            const {temp} = JSON.parse(obj[item]);
                            const {country} = JSON.parse(obj[item]);
                            return (
                            <li key={id} className='footer-app__item'>
                                <span className={tempClassName(temp)}>{temp}</span> 
                                <Link 
                                    to={`/${country}/${item}`}
                                    className='footer-app__link'>{item[0].toUpperCase() + item.substring(1)}</Link>
                            </li>)
                        }
                        return null
                        
    })
    return (
        <div className="app-footer footer-app">
            <div className="container">
                <div className="footer-app__wrapper">
                    <div className="footer-app__early">
                        <h2 className="footer-app__subtitle">Показаны ранее:</h2>
                        <ul className="footer-app__list">
                            {earlyItems}
                        </ul>
                    </div>
                    <div className="footer-app__nearly">
                        <h2 className="footer-app__subtitle">Ближайшие н.п:</h2>
                        <ul className="footer-app__list">
                            {nearly && nearly.map(item => <NearlyLiItem key={item.id} city={item}/>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Footer;