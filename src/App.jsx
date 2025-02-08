import { useState } from 'react';
import { WeatherCard } from './components/Weather';
import { CitySelector } from './components/CitySelector';
import { cities } from './constants/cities';
import './App.css';


function App() {
 const [selectedCity, setSelectedCity] = useState(null);


 return (
   <div className="app">
     <h1>Weather App</h1>
     <CitySelector
       cities={cities}
       selectedCity={selectedCity}
       onSelectCity={setSelectedCity}
     />
     {selectedCity && <WeatherCard city={selectedCity} />}
   </div>
 );
}


export default App;