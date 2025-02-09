# Weather App

A modern weather application built with React and Vite that provides real-time weather information.

<img width="1512" alt="Screenshot 2025-02-08 at 4 20 49 PM" src="https://github.com/user-attachments/assets/2410add8-0d4b-4d28-87b3-9b08b141f743" />

## Demo
https://github.com/user-attachments/assets/e5db32e5-ad2e-4af4-97d2-749b2e01ffd4

## Features

- Current weather conditions
- Temperature display in Celsius/Fahrenheit (based on your choice)
- Weather forecast (hourly and daily)
- Responsive design
- Location-based weather data

## Technologies Used

- React
- Vite
- OpenWeatherMap API

## API Usage

This app uses the OpenWeatherMap API with the following endpoints:

- Current Weather: `/weather`
- 5-day Forecast: `/forecast`
- Geocoding: `/geo/1.0/direct`

## Getting Started

1. Clone the repository

2. Get your API key from OpenWeatherMap. [Instructions](#how-to-get-your-api-key)

3. Create a `.env` file in the root directory and add your API key. [Instructions](#environment-variables-setup)

4. Install dependencies
```
npm install
```

5. Start the development server
```
npm run dev
```

## Environment Variables Setup

Create a `.env` file in the root directory and add your API key:
```
OPENWEATHER_API_KEY=your_api_key_here
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
OPENWEATHER_UNITS=metric 
```

## How to Get Your API key

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Navigate to your API keys section
3. Generate a new API key (Free tier includes 60 calls/minute)

API Documentation:
- [Current Weather Data](https://openweathermap.org/current)
- [5 day weather forecast](https://openweathermap.org/forecast5)
- [Geocoding API](https://openweathermap.org/api/geocoding-api)
