import { Context } from '../../service/Context';
import { Routes, Route, useParams } from 'react-router-dom';
import { countriesAbbr as abbr} from '../../db/countriesAbbrToRu';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import Header from '../header/Header';
import CountriesPage from '../pages/countries-page/CountriesPage';
import WeatherPage from '../pages/weather-page/WeatherPage';
import MainPage from '../pages/main-page/MainPage';
import Page404 from '../pages/404-page/Page404';
import CountryPage from '../pages/country-page/CountryPage';
import './app.scss';


function App() {
	
	return (
			<Context.Provider value={abbr}>
				<div className="app">
					<ErrorBoundary>
						<Header/>
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
									path={'/Все_страны'}
									element={<CountriesPage/>}/>
								<Route 
									path="/"
									element={<MainPage/>}/>
								<Route path='*' element={<Page404 defPage={`/`}/>} />
							</Routes>
						</div>
					</div>
					
				</div>
			</Context.Provider>
		
	);
}

export default App;
