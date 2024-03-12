const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function searchNews(query) {
    try {
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.apiKey}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al buscar noticias');
    }
}

module.exports = { searchNews };
