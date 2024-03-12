const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { searchNews } = require('../controllers/controllers');
const User = require('../models/models')
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.render('index');
        }
        const news = await searchNews(query);
        res.render('index', { news });
    } catch (error) {
        console.error(error);
        res.render('index', { error: 'Error al buscar noticias' });
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({username, password: hashedPassword})
        await user.save()
        res.redirect('/login');

    } catch (error) {
        console.error(error);
        res.render('register', { error: 'Error al registrar usuario' });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar el usuario en la base de datos
        const usuario = await User.findOne({ username });

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Nombre de usuario o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const contrasenaValida = await bcrypt.compare(password, usuario.password);
        if (!contrasenaValida) {
            return res.status(401).json({ mensaje: 'Nombre de usuario o contraseña incorrectos' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: usuario._id }, 'secreto', { expiresIn: '1h' });

        // Redirigir al usuario a la página de inicio o devolver el token en una respuesta JSON
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
});


module.exports = router;