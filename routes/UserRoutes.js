const router = require('express').Router();
const UserControllers = require('../controllers/UserController');
const checkToken = require('../middleware/auth');

router.post('/register', UserControllers.register);
router.post('/login', UserControllers.login);
router.post('/profile', checkToken, UserControllers.getUser);

module.exports = router;