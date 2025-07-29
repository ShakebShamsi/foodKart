import foodModel from "../models/foodModel.js";
import fs from "fs";
 

// // Get all food items
// export const getAllFoodItems = async (req, res) => {
//   try {
//     const foodItems = await foodModel.find({});
//     res.status(200).json(foodItems);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching food items", error });
//   }
// };


// Add a new food item
const addFood = async (req, res) => {
   if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
   }
   let image_filename = req.file.filename;
   const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: image_filename,
      category: req.body.category
   });
   try {
      await food.save();
      res.json({ success: true, message: "Food item added successfully" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error adding food item" });
   }
};
export { addFood };


// // Update a food item
// export const updateFoodItem = async (req, res) => { 
//   try {
//     const { id } = req.params;
//     const updatedFoodItem = await foodModel.findByIdAndUpdate(id, req.body, { new: true });
//     res.status(200).json(updatedFoodItem);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating food item", error });
//   }
// };
