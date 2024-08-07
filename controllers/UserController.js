const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, scholarId, email, mobileNumber, password, year } = req.body;
            if (!scholarId || !email || !password || !firstName || !lastName || !mobileNumber || !year) {
                return res.status(200).json({ message: 'Please enter all fields' });
            }
            const user = await User.findOne({
                scholarId: scholarId,
            })
            if (user) {
                return res.status(200).json({ message: 'User already exists' });
            }
            const salt = await bcrypt.genSalt(config.encryption.saltRounds);
            const hash = await bcrypt.hash(password, salt);
            try {
                let user = await User.create({
                    firstName,
                    lastName,
                    scholarId,
                    email,
                    year,
                    hostelAlloted: year,
                    mobileNumber,
                    password: hash,
                });
                user.password = undefined;
                res.status(200).json({ status: "success",user, message: 'User added successfully', token: jwt.sign({ scholarId: scholarId }, config.encryption.secret, { expiresIn: '365d' }) });
            } catch (err) {
                console.log(err);
                if (scholarId.length != 9) {
                    return res.status(200).json({ message: 'Scholar Id must be 9 digits' });
                }
                if (mobileNumber.length != 10) {
                    return res.status(200).json({ message: 'Mobile Number must be 10 digits' });
                }
                res.status(200).json({ message: 'Server error' });
            }
        } catch (err) {
            console.log(err);
            res.status(200).json({ message: 'Internal Server Error' });
        }

    },
    login: async (req, res) => {
        try {
            const { scholarId, password } = req.body;
            if (!scholarId || !password) {
                return res.status(200).json({ message: 'Please enter all fields' });
            }
            const user = await User.findOne({ scholarId: scholarId });
            if (!user) {
                return res.status(200).json({ message: 'User does not exist' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(200).json({ message: 'Invalid credentials' });
            }
            user.password = undefined;
            res.status(200).json({ status: "success",user, message: 'User logged in successfully', token: jwt.sign({ scholarId: user.scholarId }, config.encryption.secret, { expiresIn: '365d' }) });
        } catch (err) {
            res.status(200).json({ message: 'Server error' });
        }
    },
    getUser: async (req, res) => {
        try {
            res.status(200).json({ message: 'User found', user: req.userData });
        } catch (err) {
            res.status(200).json({ message: 'Server error' });
        }
    },
}