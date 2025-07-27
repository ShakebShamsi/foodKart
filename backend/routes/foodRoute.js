import express from 'express';
import { getAllFoods, createFood, updateFood, deleteFood } from '../controllers/foodController.js';
import multer from 'multer'; 