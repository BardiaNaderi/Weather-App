# Weather App

A modern weather application built with React and Vite that provides real-time weather information.

## Features

- Current weather conditions
- Temperature display in Celsius/Fahrenheit
- Weather forecast
- Responsive design
- Location-based weather data

## Technologies Used

- React
- Vite
- [Additional libraries/APIs used in your project]

## Getting Started

1. Clone the repository

2. Get your API key from OpenWeatherMap

3. Create a `.env` file in the root directory and add your API key.

4. Install dependencies
```
npm install
```

5. Start the development server
```
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory and add your API key:
```
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_BASE_URL=http://api.openweathermap.org/data/2.5
VITE_WEATHER_UNITS=metric 
```

## API Usage

This app uses the OpenWeatherMap API with the following endpoints:

- Current Weather: `/weather`
- 5-day Forecast: `/forecast`
- Geocoding: `/geo/1.0/direct`

To get your API key:
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Navigate to your API keys section
3. Generate a new API key (Free tier includes 60 calls/minute)

API Documentation:
- [Current Weather Data](https://openweathermap.org/current)
- [5 day weather forecast](https://openweathermap.org/forecast5)
- [Geocoding API](https://openweathermap.org/api/geocoding-api)

