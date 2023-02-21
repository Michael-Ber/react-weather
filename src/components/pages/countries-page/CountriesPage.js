import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import { Context } from "../../../service/Context";
import { useContext, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";

import './countriesPage.scss';

const CountriesPage = () => {
    const abbr = useContext(Context);
    const arr = abbr.map(item => Array.from(Object.values(item))[0]).sort((a,b) => a > b ? 1 : -1);
    const upperLiteralCountry = [...new Set(arr.map(item => item[0]))];

    const content = upperLiteralCountry.map((item, i) => {
        return (
            <li key={i} className="countries-page__item item-countries-page" >
                <p className="item-countries-page__header">{item}</p> {/*Country Literal*/}
                <ul className="item-countries-page__sublist">
                    {arr
                        .filter(country => country[0] === item)
                        .map((item, j) => 
                            <li className="item-countries-page__subitem" key={j}> {/*Country*/}
                                <Link 
                                    to={`/${item}`} 
                                    className="item-countries-page__link">
                                    {item}
                                </Link>
                            </li>
                            )
                    }
                </ul>
            </li>
        )
    })
    return (
        <>
            <ErrorBoundary>
                <div className="countries-page">
                    <h1 className="countries-page__countries">Список доступных стран</h1>
                    <ul className="countries-page__list">
                        {content}
                    </ul>
                </div>
            </ErrorBoundary>
        </>
    )
}

export default CountriesPage;