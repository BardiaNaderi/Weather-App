const express = require('express');
const { createServer: createViteServer } = require('vite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

async function createServer() {
  const app = express();

  app.get('/api/weather', async (req, res) => {
    try {
      const { id } = req.query;
      const response = await fetch(
        `${process.env.OPENWEATHER_BASE_URL}/weather?id=${id}&appid=${process.env.OPENWEATHER_API_KEY}&units=${process.env.OPENWEATHER_UNITS}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/forecast', async (req, res) => {
    try {
      const { id } = req.query;
      const response = await fetch(
        `${process.env.OPENWEATHER_BASE_URL}/forecast?id=${id}&appid=${process.env.OPENWEATHER_API_KEY}&units=${process.env.OPENWEATHER_UNITS}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch forecast data');
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
}); 