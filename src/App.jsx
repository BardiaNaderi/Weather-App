import { useState } from 'react';
import { WeatherCard } from './components/Weather';
import { CitySelector } from './components/CitySelector';
import './App.css';

const cities = [
  {
    id: 6167865,
    name: "Toronto",
    country: "CA"
  },
  {
    id: 6094817,
    name: "Ottawa",
    country: "CA"
  },
  {
    id: 1850147,
    name: "Tokyo",
    country: "JP"
  }
];

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