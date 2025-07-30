import foodModel from "../models/foodModel.js";

// Add a new food item
const addFood = async (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ success: false, message: "Image file is required" });
  }

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.file.path,
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

export { addFood };
