const Project = require('../models/Projects');

exports.getAll = async (req, res) => {
    try {
        const items = await Project.find();
        const data = items.map(p => ({ title: p.title, description: p.description, completion: p.completion, id: p._id }));
        res.status(200).json({ success: true, message: "Projects list retrieved successfully.", data });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const item = await Project.create(req.body);
        res.status(201).json({ success: true, message: "Project added successfully.", data: { ...item._doc, id: item._id } });
    } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

// Add standard Update/Delete/GetByID here following the Reference template pattern.
