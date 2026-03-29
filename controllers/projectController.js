const Project = require('../models/Projects');

// GET all projects
exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find();

    const formattedData = projects.map(project => ({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      keyFeatures: project.keyFeatures,
      completion: project.completion,
      id: project._id
    }));

    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: formattedData
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// GET project by ID
exports.getById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      data: {
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        keyFeatures: project.keyFeatures,
        completion: project.completion,
        id: project._id
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// CREATE project
exports.create = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: {
        title: savedProject.title,
        description: savedProject.description,
        techStack: savedProject.techStack,
        keyFeatures: savedProject.keyFeatures,
        completion: savedProject.completion,
        id: savedProject._id
      }
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// UPDATE project
exports.update = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: {
        title: updatedProject.title,
        description: updatedProject.description,
        techStack: updatedProject.techStack,
        keyFeatures: updatedProject.keyFeatures,
        completion: updatedProject.completion,
        id: updatedProject._id
      }
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// DELETE project
exports.delete = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};