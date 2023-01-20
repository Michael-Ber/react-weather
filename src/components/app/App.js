
import Header from '../header/Header';
import MainPage from '../pages/MainPage';
import './app.scss';


function App() {

	return (
		<div className="app">
			<Header />
			<div className="app-content">
				<div className="container">
					<MainPage />
				</div>
			</div>
		</div>
	);
}

export default App;
