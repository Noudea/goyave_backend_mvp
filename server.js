import express from 'express';
import connectToDatabase from './services/connectdb.js'
import * as dotenv from 'dotenv'
import router from './routes/router.js'

const app = express();
const port = 8000;

if(process.env.NODE_ENV === 'development'){
  dotenv.config({
    path : './development.env'
  })
  console.log('Successfully loaded development environment')
}

await connectToDatabase();
//routes and middlewares
app.use(express.json());
app.use('/',router)

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});