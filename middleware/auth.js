const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../model/User');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['auth-token']
        const decoded = jwt.verify(token, config.encryption.secret);
        req.userData = await User.findOne({
            scholarId: decoded.scholarId
        });
        req.userData.password = undefined;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
    }
}