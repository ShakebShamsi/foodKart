import express from 'express';
import { addFood, getAllFoods, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../cloudinaryConfig.js';

const foodRouter = express.Router();

const foodStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
   folder: 'foodkart/foods',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({ storage: foodStorage });

foodRouter.post('/add', upload.single("image"), addFood);
foodRouter.get('/allFoods', getAllFoods);
foodRouter.delete('/remove/:id', removeFood);


export default foodRouter;
