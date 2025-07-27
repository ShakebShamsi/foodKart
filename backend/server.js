import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';





//App configuration
const app = express();
const port = 4000;



//Middleware
app.use(express.json());
app.use(cors());


// DB Connection
connectDB()

app.get('/', (req, res) => {
  res.send('API is running');
});


//Strat the express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
