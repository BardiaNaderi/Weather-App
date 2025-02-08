export const toProperCase = (str) => {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatTemperature = (temp) => `${Math.round(temp)}°C`;

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
}; 