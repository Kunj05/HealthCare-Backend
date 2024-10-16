const Service = require('../models/serviceModel');

// Add a new service
exports.addService = async (req, res) => {
    const { name, description, price } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: "Service name is required and must be a non-empty string." });
    }

    if (name.length < 3 || name.length > 100) {
        return res.status(400).json({ error: "Service name must be between 3 and 100 characters." });
    }

    if (description && typeof description !== 'string') {
        return res.status(400).json({ error: "Description must be a string." });
    }

    if (description && description.length > 500) {
        return res.status(400).json({ error: "Description must not exceed 500 characters." });
    }

    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ error: "Price must be a non-negative number." });
    }

    try {
        const service = new Service({ name, description, price });
        await service.save();
        res.status(201).json({
            message: "Service added successfully",
            service,
        });
    } catch (error) {
        console.error("Error creating service:", error);
        res.status(500).json({ error: "Internal server error while creating service" });
    }
};

// Update a service
exports.updateService = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    if (name && (typeof name !== 'string' || name.trim() === '' || name.length < 3 || name.length > 100)) {
        return res.status(400).json({ error: "Service name must be a non-empty string and between 3 and 100 characters." });
    }

    if (description && typeof description !== 'string') {
        return res.status(400).json({ error: "Description must be a string." });
    }

    if (description && description.length > 500) {
        return res.status(400).json({ error: "Description must not exceed 500 characters." });
    }

    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
        return res.status(400).json({ error: "Price must be a non-negative number." });
    }

    try {
        const service = await Service.findByIdAndUpdate(id, { name, description, price }, { new: true, runValidators: true });
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error('Error updating service:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid service ID' });
        }
        res.status(500).json({ error: 'Internal server error while updating service' });
    }
};



// Get all services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({
            success:true,
            services
        });
    } catch (error) {
        console.error("Error retrieving services:", error);
        res.status(500).json({ error: "Internal server error while retrieving services" });
    }
};


// Delete a service
exports.deleteService = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findByIdAndDelete(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid service ID' });
        }
        res.status(500).json({ error: 'Internal server error while deleting service' });
    }
};