import { useState, useEffect } from 'react';
import { Context } from '../../service/Context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './footer.scss';

const Footer = () => {

    const [obj, setObj] = useState();
    console.log(obj);
    const {cityName} = useParams();
    useEffect(() => {
        setObj(localStorage)
    }, [localStorage])

    const earlyItems = obj && Object.keys(obj).filter(item => item !== cityName).map(item => {
        return <li className='footer-app__item'>
            <Link>{item}</Link>
            {JSON.parse(obj[item]).temp}
        </li>
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
                    <div className="footer-app__nearly"></div>
                </div>
            </div>
        </div>
    )
};
export default Footer;