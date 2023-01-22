
import { useFormik } from 'formik';
import './search.scss';
import search from './search.svg';

const Search = ({setCityProp}) => {
    const formik = useFormik({
        initialValues: {
            city: ''
        },
        onSubmit: values => {
            setCityProp(values.city);
            values.city = '';
        }
    })
    return (
        <div className="app-search">
            <div className="app-search__icon">
                <img src={search} alt="search-icon" />
            </div>
            <form onSubmit={formik.handleSubmit}>
                <input 
                    type="text" 
                    className='app-search__input'
                    placeholder='Введите город'
                    value={formik.values.city}
                    name="city"
                    id="city"
                    onChange={formik.handleChange}
                />
            </form>
        </div>
    )
};

export default Search;