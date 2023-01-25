import { useState, useEffect } from 'react';
import { Context } from '../../service/Context';
import {BrowserRouter as Router, Routes, Route, useNavigate, useParams} from 'react-router-dom';
import { countriesAbbr as abbr} from '../../bd/countriesAbbrToRu';
import Header from '../header/Header';
import MainPage from '../pages/MainPage';
import WeatherPage from '../pages/WeatherPage';
import useWeatherService from '../../service/WeatherService';
import Page404 from '../pages/Page404';
import CountryPage from '../pages/CountryPage';
import './app.scss';


function App() {
	const [cityProp, setCityProp] = useState('Братск');
	const [country, setCountry] = useState();
	const {modifyCityName} = useWeatherService();
	const nav = useNavigate();
	console.log(country);
	// useEffect(() => {
	// 	nav(`/Погода_в_${modifyCityName(cityProp)}`)
	// }, [])
	return (
		// <Router>
			<Context.Provider value={abbr}>
				<div className="app">
					<Header setCityProp={setCityProp}/>
					<div className="app-content">
						<div className="container">
							<Routes>
								<Route 
									path={`/Погода_в_${modifyCityName(cityProp)}`} 
									element={<WeatherPage cityProp={cityProp}/>} />
								<Route 
									path={`/${country}`}
									element={<CountryPage country={country}/>}/>
								<Route 
									path="/"
									element={<MainPage setCountry={setCountry}/>}/>
								<Route path='*' element={<Page404 defPage={`/Погода_в_${modifyCityName(cityProp)}`}/>} />
							</Routes>
						</div>
					</div>
				</div>
			</Context.Provider>
		// </Router>
		
	);
}

export default App;
