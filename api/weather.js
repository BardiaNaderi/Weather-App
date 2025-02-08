export default async function handler(req, res) {
    try {
      const { id } = req.query;
      const response = await fetch(
        `${process.env.VITE_WEATHER_BASE_URL}/weather?id=${id}&appid=${process.env.VITE_WEATHER_API_KEY}&units=${process.env.VITE_WEATHER_UNITS}`
      );
      if (!response.ok) throw new Error('Weather data fetch failed');
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }