import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate, useParams} from 'react-router-dom'
import Header from '../header/Header';
import MainPage from '../pages/MainPage';
import useWeatherService from '../../service/WeatherService';
import Page404 from '../pages/Page404';
import './app.scss';


function App() {
	const [cityProp, setCityProp] = useState('Братск');
	const {modifyCityName} = useWeatherService();
	const nav = useNavigate();
	useEffect(() => {
		nav(`/Погода_в_${modifyCityName(cityProp)}`)
	}, [])
	return (
		// <Router>
			
			<div className="app">
				<Header setCityProp={setCityProp}/>
				<div className="app-content">
					<div className="container">
						<Routes>
							<Route 
								path={`/Погода_в_${modifyCityName(cityProp)}`} 
								element={<MainPage cityProp={cityProp}/>} />
							<Route path='*' element={<Page404 defPage={`/Погода_в_${modifyCityName(cityProp)}`}/>} />
						</Routes>
					</div>
				</div>
			</div>
		// </Router>
		
	);
}

export default App;
