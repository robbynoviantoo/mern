const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;
  let profileImage = req.body.profileImage;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profileImage = result.secure_url;
    }

    if (!req.file) {
      profileImage = user.profileImage;
    }

    user.profileImage = profileImage;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  editUser,
};
