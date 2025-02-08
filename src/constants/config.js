const requiredEnvVar = (name) => {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const API_KEY = requiredEnvVar('VITE_WEATHER_API_KEY');
export const BASE_URL = requiredEnvVar('VITE_WEATHER_BASE_URL');
export const UNITS = requiredEnvVar('VITE_WEATHER_UNITS'); 