import { useContext, useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { Context } from "../../../service/Context";
import useWeatherService from "../../../service/WeatherService";
import Spinner from "../../spinner/Spinner";
import Error from "../../error/Error";

import './countryPage.scss';
import setContent from "../../../utils/setContent";

const CountryPage = () => {
    const [cities, setCities] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const abbr = useContext(Context);
    const {getCountries, process, setProcess} = useWeatherService();
    const {pathname} = useLocation();
    let {countryName} = useParams();
    const countryAbbr = countryName && Object.keys(...abbr.filter(elem => Object.values(elem)[0] === countryName))[0];
    

    useEffect(() => {
        // setError(false);
        getCountries(countryAbbr)
            .then(res => setCities(res))
            .then(() => setProcess('confirmed'))
            // .then(() => setLoading(false))
            // .catch(eer => {setError(true); console.log(eer)});
            .catch(eer => {setProcess('error'); console.log(eer)});
    }, [])

    // const addActive = (e) => {
    //     switch(e.target.classList.value) {
    //         case 'item-country__sublist': e.target.classList.add('item-country__sublist_active'); break;
    //         case 'item-country__subitem': e.target.parentNode.classList.add('item-country__sublist_active'); break;
    //         case 'item-country__link': e.target.parentNode.parentNode.classList.add('item-country__sublist_active'); break;
    //         default: return 
    //     }
    // }
    // const removeActive = (e) => {
    //     switch(e.target.classList.value) {
    //         case 'item-country__sublist': e.target.classList.remove('item-country__sublist_active'); break;
    //         case 'item-country__subitem': e.target.parentNode.classList.remove('item-country__sublist_active'); break;
    //         case 'item-country__link': e.target.parentNode.parentNode.classList.remove('item-country__sublist_active'); break;
    //         default: e.target.classList.remove('item-country__sublist_active')
    //     }
    // }

    // console.log('render');
    // const spinner = (loading && !error) ? <Spinner /> : null;
    // const errorMessage = error ? <Error /> : null;
    // const content = (!loading && !error) && cities.map((arr, i) => {
    //     return (
    //         <li 
    //             key={i}
    //             className="country__item item-country">
    //             <p className="item-country__header">{arr.length > 0 && arr[0].name[0]}</p> {/*First arr item -> First literal of name */}
    //             <ul 
    //                 onMouseEnter={(e) => addActive(e)} 
    //                 onMouseLeave={(e) => removeActive(e)} 
    //                 className="item-country__sublist">
    //                 {arr.map((obj, j) => {
    //                     return (
    //                         <li key={j} className="item-country__subitem">
    //                             <Link
    //                                 to={`${decodeURI(pathname)}/${obj.name}`}
    //                                 className="item-country__link">
    //                                 {obj.name}
    //                             </Link>
    //                         </li>
    //                     )
    //                 })}
    //             </ul>
    //         </li>
    //     )
    // })

    return (

        <div className="country">
            
            {setContent(process, () => {
                return (
                    <>
                        <h1 className="country__title">{countryName}</h1>
                        <ul className="country__list">
                            {cities.map((arr, i) => {
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
                                    return (
                                        <li 
                                            key={i}
                                            className="country__item item-country">
                                            <p className="item-country__header">{arr.length > 0 && arr[0].name[0]}</p> {/*First arr item -> First literal of name */}
                                            <ul 
                                                onMouseEnter={(e) => addActive(e)} 
                                                onMouseLeave={(e) => removeActive(e)} 
                                                className="item-country__sublist">
                                                {arr.map((obj, j) => {
                                                    return (
                                                        <li key={j} className="item-country__subitem">
                                                            <Link
                                                                to={`${decodeURI(pathname)}/${obj.name}`}
                                                                className="item-country__link">
                                                                {obj.name}
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </>
                )
            })}
        </div>







        // <div className="country">
        //     <h1 className="country__title">{countryName}</h1>
        //     <ul className="country__list">
        //         {/* {spinner} */}
        //         {/* {error} */}
        //         {/* {content} */}
        //         {setContent(process, () => cities.map((arr, i) => {
        //                 return (
        //                     <li 
        //                         key={i}
        //                         className="country__item item-country">
        //                         <p className="item-country__header">{arr.length > 0 && arr[0].name[0]}</p> {/*First arr item -> First literal of name */}
        //                         <ul 
        //                             onMouseEnter={(e) => addActive(e)} 
        //                             onMouseLeave={(e) => removeActive(e)} 
        //                             className="item-country__sublist">
        //                             {arr.map((obj, j) => {
        //                                 return (
        //                                     <li key={j} className="item-country__subitem">
        //                                         <Link
        //                                             to={`${decodeURI(pathname)}/${obj.name}`}
        //                                             className="item-country__link">
        //                                             {obj.name}
        //                                         </Link>
        //                                     </li>
        //                                 )
        //                             })}
        //                         </ul>
        //                     </li>
        //                 )
        //             })
        //         )}
        //     </ul>
        // </div>
    )
};
export default CountryPage;