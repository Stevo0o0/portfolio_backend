const Service = require('../models/Services');

// GET all services
exports.getAll = async (req, res) => {
    try {
        const services = await Service.find();
        const formattedData = services.map(s => ({
            title: s.title,
            description: s.description,
            id: s._id
        }));

        res.status(200).json({
            success: true,
            message: "Services list retrieved successfully.",
            data: formattedData
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// GET service by id
exports.getById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Service retrieved successfully.",
            data: {
                title: service.title,
                description: service.description,
                id: service._id
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// POST add new service
exports.create = async (req, res) => {
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
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// PUT update service
exports.update = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedService) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Service updated successfully.",
            data: {
                title: updatedService.title,
                description: updatedService.description,
                id: updatedService._id
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// DELETE service
exports.delete = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);

        if (!deletedService) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Service deleted successfully."
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};