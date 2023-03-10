import Search from '../search/Search';
import './header.scss';
import sky from './sky.svg';

const Header = ({setCityProp}) => {
    
    return (
        <div className="app-header">
            <div className="app-header__wrapper">
                <div className="app-header__icon">
                    <img src={sky} alt="weather-icon" />
                </div>
                <p className="app-header__title">World Weather</p>
                <Search setCityProp={setCityProp}/>
            </div>
            
        </div>
    )
};

export default Header;