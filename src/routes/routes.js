
const router = require('express').Router()
const userController = require('../controllers/userController');
const {authenticateMiddleware, authorizeMiddleware } = require('../middleware/middleware')

router.get('/users',authenticateMiddleware, userController.getUser);
router.get('/users/:id',authenticateMiddleware, userController.getUserById);
router.post('/users',[authenticateMiddleware, authorizeMiddleware], userController.createUser);
router.put('/users/:id',[authenticateMiddleware, authorizeMiddleware], userController.updateUser);
router.delete('/users/:id',[authenticateMiddleware, authorizeMiddleware], userController.deleteUser);

module.exports = router;


