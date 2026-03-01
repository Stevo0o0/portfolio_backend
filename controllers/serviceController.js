const Service = require('../models/Services');

// GET all services [cite: 40]
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        const formattedData = services.map(s => ({
            title: s.title,
            description: s.description,
            id: s._id // requirement: map _id to id [cite: 30, 40]
        }));
        res.status(200).json({
            success: true,
            message: "Services list retrieved successfully.",
            data: formattedData
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// POST add new service [cite: 23]
exports.createService = async (req, res) => {
    try {
        const newService = new Service(req.body);
        const savedService = await newService.save();
        res.status(201).json({
            success: true,
            message: "Service added successfully.",
            data: {
                title: savedService.title,
                description: savedService.description,
                id: savedService._id
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// PUT update service [cite: 34]
exports.updateService = async (req, res) => {
    try {
        await Service.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Service updated successfully."
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// DELETE service [cite: 34]
exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Service deleted successfully."
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
