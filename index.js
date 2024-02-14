require("dotenv").config();
const express = require('express');
const routes = require('./routes/routes'); 



const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor corre en el puerto ${PORT}`) ;
});
