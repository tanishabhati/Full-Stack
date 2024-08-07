const Notice = require('../model/Notice');

module.exports = {
    addNotice: async (req, res) => {
        try{
            const { title, description } = req.body;
            if(req.admin === false){
                return res.status(200).json({
                    message: 'Unauthorized'
                });
            }
            if(!title || !description){
                return res.status(200).json({
                    message: 'Bad Request'
                });
            }
            const notice = await Notice.create({
                title: title,
                description: description,
                hostel: req.userData.hostelAlloted
            });
            res.status(200).json({
                status: 'success',
                message: 'Notice added successfully',
                data: notice
            });
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
    getNotices: async (req, res) => {
        try{
            const notices = await Notice.find({
                hostel: req.userData.hostelAlloted
            }).sort({date: -1});
            res.status(200).json({
                status: 'success',
                message: 'Notices fetched successfully',
                data: notices
            });
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
    topNotice: async (req, res) => {
        try{
            const notices = await Notice.find({
                hostel: req.userData.hostelAlloted
            }).sort({date: -1}).limit(1);
            res.status(200).json({
                status: 'success',
                message: 'Notices fetched successfully',
                data: notices
            });
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }
}