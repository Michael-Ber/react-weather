import { Link } from "react-router-dom";
import bg from './bg.png';
import './mainPage.scss';

const MainPage = () => {

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