const Fine = require('../model/Fine');

module.exports = {
    showFines: async (req, res) => {
        try {
            const fines = await Fine.find({ scholarId: req.userData.scholarId, status: false });
            return res.status(200).json({ status: 'success', fine: fines });
        } catch (err) {
            console.log(err);
            res.status(200).json({ message: 'Internal Server Error' });
        }
    },
    payFine: async (req, res) => {
        const { id, transactionId } = req.body;
        console.log(id, transactionId);
        if (!id || !transactionId) {
            return res.status(200).json({ message: 'Fine ID and Transaction ID are required' });
        }
        Fine.findById(id, (err, fine) => {
            if (err) {
                return res.status(200).json({ message: 'Fine not found' });
            }
            fine.transactionId = transactionId;
            fine.status = true;
            fine.save();
            return res.status(200).json({ message: 'Fine paid' });
        });
    },
    showPaidFines: async (req, res) => {
        try {
            const fines = await Fine.find({ scholarId: req.userData.scholarId, status: true });
            return res.status(200).json({ status: 'success', fine: fines });
        } catch (err) {
            console.log(err);
            res.status(200).json({ message: 'Internal Server Error' });
        }
    }
}