import { Component } from "react";
import Error from "../error/Error";

class ErrorBoundary extends Component {
    state = {
        error: false
    };

    componentDidCatch(error) {
        this.setState({error: true})
        
    }
    
    render() {
        const {error} = this.state;
        return (
            <>
                {error ? <Error /> : this.props.children}
            </>
        )
    }
}

export default ErrorBoundary