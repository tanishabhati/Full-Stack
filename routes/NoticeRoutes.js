const router = require('express').Router();
const Notice = require('../controllers/NoticeController.js');
const checkAdmin = require('../middleware/adminCheck');
const checkToken = require('../middleware/auth');

router.post('/add', checkAdmin, Notice.addNotice);
router.post('/get',checkToken, Notice.getNotices);
router.post('/top',checkToken, Notice.topNotice);

module.exports = router;