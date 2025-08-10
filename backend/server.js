import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


//App configuration
const app = express();
const port = 4000;



//Middleware
app.use(express.json());
// app.use(cors({ origin: `https://foodkart-nje9.onrender.com` }));
// Define allowed origins dynamically for local development and prod
const allowedOrigins = [
   'https://foodkart-nje9.onrender.com',  // FoodKart UI prod URL
   'https://foodkart-inventory.onrender.com', // Inventory UI prod URL
   'http://localhost:5173',                // FoodKart UI local URL
   'http://localhost:5000',                // Admin local URL
  
];

// CORS middleware setup
app.use(cors({ 
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));



// DB Connection
connectDB();


//API enpoints
app.use('/api/food', foodRouter)
app.use('/api/user/', userRouter)
app.use('/api/cart/', cartRouter)
app.use('/api/order/', orderRouter)






app.get('/', (req, res) => {
  res.send('API is running');
});


//Strat the express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
