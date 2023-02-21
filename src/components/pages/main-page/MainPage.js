import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg from './bg.png';
import './mainPage.scss';

const MainPage = () => {
    const nav = useNavigate();

    useEffect(() => {
        if(localStorage.length > 0) {
            const countryName = JSON.parse(localStorage.getItem(Object.keys(localStorage)[0]));
            const cityName = Object.keys(localStorage)[0];
            nav(`/${countryName.country}/${cityName}`)
        }
    }, [])
    return (
        <div className="main-page">
            <img    
                className="main-page__img"
                src={bg} 
                alt="main-page background" />
            <h1 className="main-page__title">Погода в мире</h1>
            <h3 className="main-page__text">Введите название города и, если нужно, страны, или перейдите ко списку всех <Link to={'/Все_страны'}>стран</Link></h3>
        </div>
    )
}

export default MainPage;