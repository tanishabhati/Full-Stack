const router = require('express').Router();
const Complaint = require('../controllers/RecordController');
const checkToken = require('../middleware/auth');

router.post('/data_exit', checkToken, Complaint.dataExit);
router.post('/data_entry', checkToken, Complaint.dataEntry);
router.post('/data_all', checkToken, Complaint.dataAll);

module.exports = router;