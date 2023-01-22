import errorGif from './error.gif';
import './error.scss';

const Error = () => {
    return (
        <div className="error">
            <span className='error__title'>Ошибка, перезагрузите страницу</span>
            <img src={errorGif} alt="error gif" />
        </div>
    )
}

export default Error;