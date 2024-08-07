const Room = require('../model/Room');

module.exports = {
    allot: async (req, res) => {
        try {
            const { transactionId } = req.body;
            if (!transactionId) {
                return res.status(200).json({ message: 'Transaction ID is required' });
            }
            const room = await Room.findOne({ scholarId: req.userData.scholarId });
            if (room) {
                return res.status(200).json({ message: 'Room already allotted' });
            }
            const availableRooms = await Room.find().sort({ number: -1 }).limit(1);
            const roomNumber = (availableRooms.length === 0) ? 1 : availableRooms[0].number + 1;
            if(roomNumber > 250){
                return res.status(200).json({ message: 'No rooms available' });
            }
            const allotRoom = await Room.create({
                number: roomNumber,
                scholarId: req.userData.scholarId,
                transactionId: req.body.transactionId,
                paymentStatus: false,
                hostel: req.userData.hostelAlloted,
                name: req.userData.firstName + ' ' + req.userData.lastName
            });
            return res.status(200).json({ status:'success',message: 'Request Sent!! Please wait untill your warden confirms your presence.', room: allotRoom });
        } catch (err) {
            console.log(err);
            res.status(200).json({ message: 'Internal Server Error' });
        }
    }
}