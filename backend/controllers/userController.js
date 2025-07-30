import userModel from '../models/userModel.js';

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

export { addUser };
