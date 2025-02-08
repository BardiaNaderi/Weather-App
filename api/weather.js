import { fetchWeatherData } from '../src/utils/apiUtils';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const data = await fetchWeatherData('weather', id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}