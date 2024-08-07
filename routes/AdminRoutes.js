const router = require('express').Router();
const Complaint = require('../controllers/AdminController');
const checkAdmin = require('../middleware/adminCheck');

router.post('/dashboard', checkAdmin, Complaint.dashboard);
router.post('/complaint/resolved', checkAdmin, Complaint.resolveComplaint);
router.post('/allotRoom', checkAdmin, Complaint.allotRoom);
router.post('/room/request', checkAdmin, Complaint.getPendingRequests);
router.post('/users', checkAdmin, Complaint.userList);
router.post('/addFine', checkAdmin, Complaint.imposeFine);
router.post('/paid_fines', checkAdmin, Complaint.paidFine);

module.exports = router;