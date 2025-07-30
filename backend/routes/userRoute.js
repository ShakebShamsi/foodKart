import express from 'express';
import { addUser, getAllUsers, removeUser } from '../controllers/userController.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../cloudinaryConfig.js';

const userRouter = express.Router();

const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'foodkart/users',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const uploadUser = multer({ storage: userStorage });

userRouter.post('/add', uploadUser.single("avatar"), addUser);
userRouter.get('/allUsers', getAllUsers);
userRouter.delete('/remove/:id', removeUser);

export default userRouter;
