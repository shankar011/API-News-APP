
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;
const API_KEY = '7442e417ab1afcdaa3df163781c9130b';


app.use(cors());


app.get('/api/news', async (req, res) => {
    const searchTerm = req.query.q || 'latest'; 
    const page = req.query.page || 1;

    try {
        const response = await axios.get(`https://gnews.io/api/v4/search?q=${searchTerm}&lang=en&country=us&max=10&page=${page}&apikey=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news from API:', error.message);  
        res.status(500).json({ error: 'Unable to fetch news articles' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
