export const toProperCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/(^|\s)\w/g, letter => letter.toUpperCase());
};

export const formatTemperature = (temp) => `${Math.round(temp)}°C`;

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

export const formatHour = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: 'numeric',
    hour12: true
  });
}; 