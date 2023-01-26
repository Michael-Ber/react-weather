import { useState, useEffect } from 'react';
import { Context } from '../../service/Context';
import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import { countriesAbbr as abbr} from '../../bd/countriesAbbrToRu';
import Header from '../header/Header';
import MainPage from '../pages/main-page/MainPage';
import WeatherPage from '../pages/weather-page/WeatherPage';
import useWeatherService from '../../service/WeatherService';
import Page404 from '../pages/404-page/Page404';
import CountryPage from '../pages/country-page/CountryPage';
import './app.scss';


function App() {
	const [cityProp, setCityProp] = useState('Братск');
	// const [country, setCountry] = useState();
	// const [city, setCity] = useState('');
	const {modifyCityName} = useWeatherService();
	const nav = useNavigate();
	
	// useEffect(() => {
	// 	// nav(`/Погода_в_${modifyCityName(cityProp)}`)
	// 	setCountry(decodeURI(pathname).slice(1, decodeURI(pathname).length))
	// }, [pathname])
	
	// console.log(country);
	// const countryAbbr = country && Object.keys(...abbr.filter(elem => Object.values(elem)[0] === country))[0];
	return (
		// <Router>
			<Context.Provider value={abbr}>
				<div className="app">
					<Header setCityProp={setCityProp}/>
					<div className="app-content">
						<div className="container">
							<Routes>
								{/* <Route 
									path={`/${country}/${cityProp}`} 
									element={<WeatherPage cityProp={cityProp}/>} /> */}
								<Route 
									path={'/:countryName'}
									element={<CountryPage/>}/>
									{/* element={<CountryPage setCityProp={setCityProp} countryAbbr={countryAbbr}/>}/> */}
								<Route 
									path="/"
									// element={<MainPage setCountry={setCountry}/>}/>
									element={<MainPage/>}/>

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
