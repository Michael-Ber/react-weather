import { useContext, useEffect, useState, useRef } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { Context } from "../../../service/Context";
import useWeatherService from "../../../service/WeatherService";
import useForceUpdate from "../../../hooks/useForceUpdate.hook";

import './countryPage.scss';

const CountryPage = () => {
    const [cities, setCities] = useState([]);
    const abbr = useContext(Context);
    const {getCountries} = useWeatherService();
    const {pathname} = useLocation();
    const nameWithoutSlash = decodeURI(pathname).slice(1, decodeURI(pathname).length);
    let {countryName} = useParams();
    console.log(countryName);

    // useEffect(() => {
    //     getCountries(countryAbbr)
    //         .then(res => setCities(res))
    //         .catch(e => console.log(e));
    // }, [])

    const addActive = (e) => {
        switch(e.target.classList.value) {
            case 'item-country__sublist': e.target.classList.add('item-country__sublist_active'); break;
            case 'item-country__subitem': e.target.parentNode.classList.add('item-country__sublist_active'); break;
            case 'item-country__link': e.target.parentNode.parentNode.classList.add('item-country__sublist_active'); break;
            default: return 
        }
    }
    const removeActive = (e) => {
        switch(e.target.classList.value) {
            case 'item-country__sublist': e.target.classList.remove('item-country__sublist_active'); break;
            case 'item-country__subitem': e.target.parentNode.classList.remove('item-country__sublist_active'); break;
            case 'item-country__link': e.target.parentNode.parentNode.classList.remove('item-country__sublist_active'); break;
            default: e.target.classList.remove('item-country__sublist_active')
        }
    }

    // console.log('render');
    const content = cities.map((arr, i) => {
        return (
            <li 
                key={i}
                className="country__item item-country">
                <p className="item-country__header">{arr[0].name[0]}</p> {/*First arr item -> First literal of name */}
                <ul 
                    onMouseEnter={(e) => addActive(e)} 
                    onMouseLeave={(e) => removeActive(e)} 
                    className="item-country__sublist">
                    {arr.map((obj, j) => {
                        return (
                            <li key={j} className="item-country__subitem">
                                {/* <Link
                                    onClick={() => setCityProp(obj.name)}
                                    to={`${pathname}/${obj.name}`}
                                    className="item-country__link">
                                    {obj.name}
                                </Link> */}
                            </li>
                        )
                    })}
                </ul>
            </li>
        )
    })

    return (
        <div className="country">
            <h1 className="country__title">{nameWithoutSlash}</h1>
            <ul className="country__list">
                {content}
            </ul>
        </div>
    )
};
export default CountryPage;