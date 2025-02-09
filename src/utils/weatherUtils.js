/**
 * Groups forecast data by day, excluding today
 * Calculates daily high and low temperatures
 * @param {Array} forecastList - List of hourly forecasts
 * @returns {Object} Grouped forecast data by date
 */
export const groupForecastsByDay = (forecastList) => {
  const today = new Date().toDateString();
  const grouped = {};
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (date === today) return;
    
    if (!grouped[date]) {
      grouped[date] = {
        dayData: {
          dt: item.dt,
          weather: item.weather,
          main: {
            temp: item.main.temp,
            temp_max: item.main.temp_max,
            temp_min: item.main.temp_min
          }
        },
        hourlyData: []
      };
    }
    
    grouped[date].hourlyData.push(item);
    
    grouped[date].dayData.main.temp_max = Math.max(
      grouped[date].dayData.main.temp_max,
      item.main.temp_max
    );
    grouped[date].dayData.main.temp_min = Math.min(
      grouped[date].dayData.main.temp_min,
      item.main.temp_min
    );
  });
  
  return grouped;
};