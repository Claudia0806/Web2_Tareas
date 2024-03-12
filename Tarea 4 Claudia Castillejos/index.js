const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const routes = require('./src/routes/routes');
const path = require('path');

const app = express();

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", path.join(__dirname, "src", "views"));

// Middleware para analizar solicitudes JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/assets', express.static(path.join(__dirname, 'public')));
// Middleware para archivos estáticos
app.use(express.static('public'));

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.DB_URL)

  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Usar las rutas definidas en el archivo routes.js
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ejecutando en el puerto ${PORT}`);
});

