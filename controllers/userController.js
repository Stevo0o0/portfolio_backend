const User = require('../models/Users');

exports.getAll = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Security: hide passwords
        const data = users.map(u => ({ firstname: u.firstname, lastname: u.lastname, email: u.email, id: u._id }));
        res.status(200).json({ success: true, message: "Users retrieved successfully.", data });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, message: "User added successfully.", data: { ...user._doc, id: user._id } });
    } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
