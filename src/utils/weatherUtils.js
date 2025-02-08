export const groupForecastsByDay = (forecastList) => {
  const today = new Date().toDateString();
  const grouped = {};
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    // Skip today's forecast as it's shown separately
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
    
    // Update max/min temperatures
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