const router = require('express').Router();
const Fine = require('../controllers/FineController');
const checkToken = require('../middleware/auth');

router.post('/view', checkToken, Fine.showFines);
router.post('/pay', checkToken, Fine.payFine);
router.post('/viewPaid', checkToken, Fine.showPaidFines);

module.exports = router;