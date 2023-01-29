import { useState } from 'react';
import { Context } from '../../service/Context';
import { Routes, Route } from 'react-router-dom';
import { countriesAbbr as abbr} from '../../bd/countriesAbbrToRu';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import Header from '../header/Header';
import MainPage from '../pages/main-page/MainPage';
import WeatherPage from '../pages/weather-page/WeatherPage';
import useWeatherService from '../../service/WeatherService';
import Page404 from '../pages/404-page/Page404';
import CountryPage from '../pages/country-page/CountryPage';
import './app.scss';


function App() {
	const [cityProp, setCityProp] = useState('Братск');
	const {modifyCityName} = useWeatherService();
	
	
	return (
			<Context.Provider value={abbr}>
				<div className="app">
					<ErrorBoundary>
						<Header setCityProp={setCityProp}/>
					</ErrorBoundary>
					<div className="app-content">
						<div className="container">
							<Routes>
								<Route 
									path={`/:countryName/:cityName`} 
									element={<WeatherPage/>} />
								<Route 
									path={'/:countryName'}
									element={<CountryPage/>}/>
								<Route 
									path="/"
									element={<MainPage/>}/>
								<Route path='*' element={<Page404 defPage={`/Погода_в_${modifyCityName(cityProp)}`}/>} />
							</Routes>
						</div>
					</div>
					
				</div>
			</Context.Provider>
		
	);
}

export default App;
