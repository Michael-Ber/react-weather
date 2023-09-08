import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NearlyLiItem from './NearlyLiItem';
import useWeatherService from '../../service/WeatherService';
import { countriesAbbr } from '../../db/countriesAbbrToRu';
import './footer.scss';
import setContent from '../../utils/setContent';

const Footer = ({cityCoord}) => {

    const [obj, setObj] = useState({});
    const [nearly, setNearly] = useState([]);
    const {cityName} = useParams();
    const {getCities, process, setProcess, cloneGetCities} = useWeatherService();

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
        // cityCoord && cityCoord.hasOwnProperty('lat') && 
        // getCities()
        //     .then((res) => res.filter(item => 
        //             ((item.coord.lon > (cityCoord.lon - 2) &&
        //             item.coord.lon < cityCoord.lon) || 
        //             (item.coord.lon < (cityCoord.lon + 2) &&
        //             item.coord.lon > cityCoord.lon)) && 
        //             ((item.coord.lat > (cityCoord.lat - 2) &&
        //             item.coord.lat < cityCoord.lat) || 
        //             (item.coord.lat < (cityCoord.lat + 2) &&
        //             item.coord.lat > cityCoord.lat))
        //         ))
        //     .then(res => res.filter(item => item.name.match(/Oblast/g) === null))
        //     .then(res => {
        //         let resArr = [];
        //         for(let j = 0; j < 4; j++) {
        //             const item = res[Math.floor(Math.random()*res.length)];
        //             if(resArr.length < 1) {
        //                 resArr.push(item);
        //             }else if(resArr.filter(elem => elem.name === item.name).length === 0) {
        //                 resArr.push(item)
        //             }else {
        //                 j--;
        //             }
        //         }
                
        //         return resArr;
                
        //     })
        //     .then(res =>  setNearly(res))
        //     .then(() => setProcess('confirmed'))
        //     .catch(e => {console.log(e); setProcess('error')})

        const getNearCitiesInfo = async(arr) => {
            for await(const coord of nearlyCoordinatesArr) {
                cloneGetCities(coord)   
                    .then(res => setNearly(state => ([...state, res])))
                    .catch((eer) => console.log(eer)) 
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
                            {/* {setContent(process, () => nearly.map(item => <NearlyLiItem key={item.id} city={item}/>))} */}
                            {nearly && nearly.map(item => <NearlyLiItem key={item.id} city={item}/>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Footer;