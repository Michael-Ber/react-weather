import Spinner from "../components/spinner/Spinner";
import Error from '../components/error/Error';

const setContent = (process, Component, data, spinnerStyles) => {
    switch(process) {
        case 'waiting': return null
        case 'loading': return <Spinner customStyles={spinnerStyles}/>
        case 'error': return <Error />
        case  'confirmed': return <Component data={data}/>
        default: console.log('error')
    }
};

export default setContent;