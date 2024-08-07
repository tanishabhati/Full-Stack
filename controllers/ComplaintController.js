const Complaint = require('../model/Complaint');

module.exports = {
    addComplaint: async (req, res) => {
        try{
            const { title, holderName, category, content } = req.body;
            if(!title || !holderName || !category || !content){
                return res.status(200).json({ message: 'Please enter all fields' });
            }
            let scholarId = req.userData.scholarId;
            const complaint = await Complaint.create({
                scholarId,
                holderName,
                hostel: req.userData.hostelAlloted,
                title,
                category,
                content
            })
            res.status(200).json({ status:"success", message: 'Complaint added successfully', complaint: complaint });
        }catch(err){
            console.log(err);
            res.status(200).json({ message: 'Internal Server Error' });
        }
    },
    upvoteComplaint: async (req, res) => {
        try{
            const { complaintId } = req.body;
            console.log(complaintId, req.userData.scholarId);
            if(!req.userData.scholarId || (req.userData.scholarId && req.userData.scholarId.length != 9)){
                return res.status(200).json({ message: 'Invalid credentials' });
            }
            if(!complaintId){
                return res.status(200).json({ message: 'Please enter all fields' });
            }
            Complaint.findById(complaintId,(err, resp)=>{
                resp.upvotes += 1;
                resp.save(()=>{
                    return res.status(200).json({ status:"success", message: 'Upvoted successfully' });
                })
            });
            
        }catch(err){
            res.status(200).json({ message: 'Internal Server Error' });
        }
    },
    getComplaints: async (req, res) => {
        try{
            const complaints = await Complaint.find({
                status: false,
                hostel: req.userData.hostelAlloted
            }).sort({upvotes: -1, date: -1});
            res.status(200).json({ status:"success", complaints: complaints });
        }catch(err){
            res.status(200).json({ message: 'Internal Server Error' });
        }
    }
}