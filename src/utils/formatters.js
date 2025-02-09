/**
 * Converts a string to proper case (capitalizes first letter of each word)
 * @param {string} str - The input string to convert
 * @returns {string} The converted string in proper case
 */
export const toProperCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/(^|\s)\w/g, letter => letter.toUpperCase());
};

/**
 * Formats a temperature value with the Celsius symbol
 * @param {number} temp - The temperature value to format
 * @returns {string} Formatted temperature string with °C
 */
export const formatTemperature = (temp) => `${Math.round(temp)}°C`;

/**
 * Converts a Unix timestamp to localized date string
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

/**
 * Converts a Unix timestamp to 12-hour time format
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted time string in 12-hour format
 */
export const formatHour = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: 'numeric',
    hour12: true
  });
}; 