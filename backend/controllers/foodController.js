import foodModel from "../models/foodModel.js";
import cloudinary from '../cloudinaryConfig.js';

// Add a new food item
const addFood = async (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ success: false, message: "Image file is required" });
  }

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.file.url || req.file.path,
    category: req.body.category
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food item added successfully", food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding food item" });
  }
};

//All food items
const getAllFoods = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching food items" });
  }
};


//Remove a food item and its Cloudinary image
const removeFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Extract Cloudinary public_id from the image URL
    const imageUrl = food.image;
    const segments = imageUrl.split('/');
    const filenameWithExt = segments[segments.length - 1]; // e.g. abc123.jpg
    const folder = segments[segments.length - 2]; // e.g. foods
    const publicId = `foodkart/${folder}/${filenameWithExt.split('.')[0]}`; // e.g. foodkart/foods/abc123

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete food item from DB
    await foodModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Food item and image removed successfully" });

  } catch (error) {
    console.error("Error removing food item:", error);
    res.status(500).json({ success: false, message: "Error removing food item" });
  }
};


export { addFood, getAllFoods, removeFood }; 
