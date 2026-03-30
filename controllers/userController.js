const User = require('../models/Users');

// GET all users
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    const formattedData = users.map(user => ({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      created: user.created,
      updated: user.updated,
      id: user._id
    }));

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: formattedData
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// GET user by ID
exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        created: user.created,
        updated: user.updated,
        id: user._id
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// CREATE user
exports.create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: {
        firstname: savedUser.firstname,
        lastname: savedUser.lastname,
        email: savedUser.email,
        created: savedUser.created,
        updated: savedUser.updated,
        id: savedUser._id
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// UPDATE user
exports.update = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        created: updatedUser.created,
        updated: updatedUser.updated,
        id: updatedUser._id
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// DELETE user
exports.delete = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};