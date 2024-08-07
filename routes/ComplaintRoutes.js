const router = require('express').Router();
const Complaint = require('../controllers/ComplaintController');
const checkToken = require('../middleware/auth');

router.post('/add', checkToken, Complaint.addComplaint);
router.post('/upvote', checkToken, Complaint.upvoteComplaint);
router.post('/get', checkToken, Complaint.getComplaints);

module.exports = router;