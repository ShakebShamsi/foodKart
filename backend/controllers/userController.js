import userModel from '../models/userModel.js';
import cloudinary from '../cloudinaryConfig.js';

// Add a new user
const addUser = async (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ success: false, message: "Profile image is required" });
  }

  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    avatar: req.file.path
  });

  try {
    await user.save();
    res.json({ success: true, message: "User added successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving user" });
  }
};

// Add all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};


// Remove a user and their Cloudinary image
const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Extract Cloudinary public_id from the avatar URL
    const imageUrl = user.avatar;
    const segments = imageUrl.split('/');
    const filenameWithExt = segments[segments.length - 1]; // e.g. abc123.jpg
    const folder = segments[segments.length - 2]; // e.g. users
    const publicId = `foodkart/${folder}/${filenameWithExt.split('.')[0]}`; // e.g. foodkart/users/abc123

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete user from DB
    await userModel.findByIdAndDelete(id);

    res.json({ success: true, message: "User removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing user" });
  }
};

export { addUser , getAllUsers, removeUser};
