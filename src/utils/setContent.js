import Spinner from "../components/spinner/Spinner";
import Error from '../components/error/Error';

const setContent = (process, Component, data=null) => {
    switch(process) {
        case 'loading': return <Spinner />
        case 'error': return <Error />
        case  'confirmed': return <Component data={data}/>
        default: return <Error />
    }
};

export default setContent;