import { useContext, useState, useEffect } from 'react';
import { Context } from '../../service/Context';
import { Formik, Form, Field } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import useWeatherService from '../../service/WeatherService';
import { _splitCityName, _transformCity } from '../../utils';
import Spinner from '../spinner/Spinner';
import setContent from '../../utils/setContent';
import './search.scss';
import search from './search.svg';

const Search = () => {
    const [fetchError, setFetchError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [val, setVal] = useState('');
    const [list, setList] = useState(null);
    const nav = useNavigate();
    const { getData, process, setProcess, getCities } = useWeatherService();
    const countriesArr = useContext(Context);

    const validateInput = (value) => {
        let error;
        if(!value) {
            error = 'Введите название города'
        } else if(value.match(/[A-Z]*[a-z]*[А-Я]*[а-я]*/)[0] === '') {
            error = 'Название города должно состоять из букв';
        }
        if(value !== '') {
            setFetchError(false);
        }
        return error;
    }
    useEffect(() => {
        if(val.length > 1)  {
        setLoading(true);
         getCities()
            .then(res => res.filter(item => item.name.toLowerCase().substring(0, val.length) === val.toLowerCase()))
            .then(res => {return setList(res.map(item => ({id: item.id, name: item.name, country: countriesArr.filter(elem => Object.keys(elem)[0] === item.country)[0][item.country]})))})
            .then(() => {setProcess('confirmed'); setLoading(false)})
            // .then(res => setLoading(false))
            .catch(e => {console.log(e); setProcess('error')})
        }else if(val === '' || val === null || val.length <= 1){
            setList(null);
        }
    }, [val, setList])
    return (
        <div className="app-search">
            <div className="app-search__icon">
                <img src={search} alt="search-icon" />
            </div>
            <Formik
                initialValues={{
                    city: ''
                }}
                
                onSubmit = {values => {
                    
                    setFetchError(false);
                    const city = _splitCityName(values.city, countriesArr);
                    

                    getData(city)
                        .then(res => _transformCity(res))
                        .then(res => nav(`/${ countriesArr.filter(item => Array.from(Object.keys(item))[0] === res.country)[0][res.country] }/${city.split(',')[0]}`))
                        .then(() => setProcess('confirmed'))
                        .catch(eer => {setProcess('error');setFetchError(true);console.log(eer)})
                        .finally(() => values.city = '')
                }}
            >
                {({errors, touched}) => (
                    <Form>
                        <Field 
                            validate={validateInput}
                            className='app-search__input'
                            placeholder='Введите город'
                            onBlur={() => {setFetchError(false); setList(null)}}
                            onInput={(e) => setVal(e.target.value)}
                            name="city"
                            id="city"
                            value = {val}
                        />
                        {errors.city && touched.city && <span className='app-search__error'>{errors.city}</span>}
                        {(fetchError && !errors.city) && <span className='app-search__error'>Ошибка запроса, такого города нет в базе данных</span>}
                    </Form>
                )}
            </Formik>
            <div className="app-search__modal">
                <ul className="app-search__list">
                    {list && !loading ? setContent(process, () => list.map(item => {
                        return (
                            <li key={item.id} className="app-search__item">
                                <Link 
                                    className='app-search__link'
                                    to={`${item.country}/${item.name}`}>
                                        {item.name}, {item.country}
                                </Link>
                            </li>
                        )
                    }), null, {'width': '20px', 'height': '20px', 'left': '98%'}) : 
                    loading ?
                    <Spinner customStyles = {{'width': '20px', 'height': '20px', 'left': '98%'}}/> : null}
                    
                </ul>
                
            </div>
        </div>
    )
};

export default Search;