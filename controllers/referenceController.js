const Reference = require('../models/References');

exports.getAll = async (req, res) => {
    try {
        const refs = await Reference.find();
        const data = refs.map(r => ({
            firstname: r.firstname, lastname: r.lastname, email: r.email,
            position: r.position, company: r.company, id: r._id
        }));
        res.status(200).json({ success: true, message: "References list retrieved successfully.", data });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getByID = async (req, res) => {
    try {
        const r = await Reference.findById(req.params.id);
        if (!r) return res.status(404).json({ success: false, message: "Reference not found" });
        res.status(200).json({ success: true, message: "Reference retrieved.", data: { ...r._doc, id: r._id } });
    } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const newRef = await Reference.create(req.body);
        res.status(201).json({ success: true, message: "Reference added successfully.", data: { ...newRef._doc, id: newRef._id } });
    } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.update = async (req, res) => {
    try {
        await Reference.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ success: true, message: "Reference updated successfully." });
    } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

exports.delete = async (req, res) => {
    try {
        await Reference.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Reference deleted successfully." });
    } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
