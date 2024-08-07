const router = require('express').Router();
const RoomAllot = require('../controllers/RoomController');
const checkToken = require('../middleware/auth');

router.post('/allot', checkToken, RoomAllot.allot);

module.exports = router;