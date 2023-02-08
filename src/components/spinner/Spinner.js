import spinner from './spinner.gif';
import './spinner.scss';

const Spinner = ({customStyles}) => {
    return (
        <div style={customStyles} className="spinner">
            <img src={spinner} alt="spinner" />
        </div>
    )
}

export default Spinner;