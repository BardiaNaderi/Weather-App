import { useCallback } from 'react';
import debounce from 'lodash/debounce';

function CitySelector({ cities, selectedCity, onSelectCity }) {
  const debouncedSelectCity = useCallback(
    debounce((city) => {
      onSelectCity(city);
    }, 300),
    [onSelectCity]
  );

  return (
    <div className="city-selector">
      <select 
        value={selectedCity?.id || ''}
        onChange={(e) => {
          const city = cities.find(c => c.id === Number(e.target.value));
          debouncedSelectCity(city);
        }}
      >
        <option value="">Select a city</option>
        {cities.map(city => (
          <option key={city.id} value={city.id}>
            {city.name}, {city.country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CitySelector; 