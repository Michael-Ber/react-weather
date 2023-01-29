import { useContext, useState } from 'react';
import { Context } from '../../service/Context';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import useWeatherService from '../../service/WeatherService';
import './search.scss';
import search from './search.svg';

const Search = () => {
    const [fetchError, setFetchError] = useState(false);
    const nav = useNavigate();
    const { getCity } = useWeatherService();
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
                    getCity(values.city)
                        .then(res => nav(`/${ countriesArr.filter(item => Array.from(Object.keys(item))[0] === res.country)[0][res.country] }/${values.city}`))
                        .catch(eer => {setFetchError(true);console.log(eer)})
                        .finally(() => values.city = '')
                    
                }}
            >
                {({errors, touched}) => (
                    <Form>
                        <Field 
                            validate={validateInput}
                            className='app-search__input'
                            placeholder='Введите город'
                            onBlur={() => setFetchError(false)}
                            name="city"
                            id="city"
                        />
                        {errors.city && touched.city && <span className='app-search__error'>{errors.city}</span>}
                        {(fetchError && !errors.city) && <span className='app-search__error'>Ошибка запроса, такого города нет в базе данных</span>}
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default Search;