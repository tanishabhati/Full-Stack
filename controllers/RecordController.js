const Record = require('../model/Record');
const User = require('../model/User');

module.exports = {
    dataExit : async (req, res) => {
        try {
            return res.status(200).json({
                'type': 'exit',
                'data': req.userData
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    dataEntry : async (req, res) => {
        try {
            return res.status(200).json({
                'type': 'entry',
                'data': req.userData
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    dataAll : async (req, res) => {
        try {
            const records = await Record.find({
                scholarId: req.userData.scholarId
            });
            return res.status(200).json({
                'status': 'success',
                'data': records
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}