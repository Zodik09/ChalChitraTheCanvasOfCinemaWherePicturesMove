import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // load .env variables

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/tmdb', async (req, res) => {
  try {
    const { path, ...query } = req.query;

    if (!path) {
      return res.status(400).json({ error: "Missing 'path' in query parameters." });
    }

    const url = `https://api.themoviedb.org/3/${path}`;

    const response = await axios.get(url, {
      params: {
        ...query,
        api_key: process.env.VITE_TMDB_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('TMDB Proxy Error:', error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data || 'Internal server error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});
