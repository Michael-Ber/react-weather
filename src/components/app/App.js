import { useState } from 'react';
import Header from '../header/Header';
import MainPage from '../pages/MainPage';
import './app.scss';


function App() {
	const [cityProp, setCityProp] = useState('');
	return (
		<div className="app">
			<Header setCityProp={setCityProp}/>
			<div className="app-content">
				<div className="container">
					<MainPage cityProp={cityProp}/>
				</div>
			</div>
		</div>
	);
}

export default App;
