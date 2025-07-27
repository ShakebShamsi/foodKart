import foodModel from "../models/foodModel.js";
import fs from "fs";


// Get all food items
export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await foodModel.find({});
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food items", error });
  }
};
// Add a new food item
export const addFood = async (req, res) => {
  try {
    const newFoodItem = new foodModel(req.body);
    await newFoodItem.save();
    res.status(201).json(newFoodItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding food item", error });
  }
};
// Update a food item
export const updateFoodItem = async (req, res) => { 
  try {
    const { id } = req.params;
    const updatedFoodItem = await foodModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedFoodItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating food item", error });
  }
};