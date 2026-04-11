const User = require('../models/Users');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_secret_key";

// SIGN UP
exports.signup = async (req, res) => {
  try {
    console.log("SIGNUP HIT");
    console.log(req.body);

    const user = await User.create(req.body);

    console.log("USER CREATED");

    res.status(201).json({
      success: true,
      message: "User created successfully"
    });
  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// SIGN IN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};