import { useState, useEffect } from 'react';
import './search.scss';
import search from './search.svg';

const Search = () => {
    const [value, setValue] = useState('');
    
    return (
        <div className="app-search">
            <div className="app-search__icon">
                <img src={search} alt="search-icon" />
            </div>
            <input 
                type="text" 
                className='app-search__input'
                placeholder='Введите город'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
        </div>
    )
};

export default Search;