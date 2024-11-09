import express, { Application } from 'express';
import cors from 'cors';
import notesRoutes from './routes/noteRoutes';
import dotenv from 'dotenv';

const app: Application = express();


const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options)); // Enable CORS for all routes


app.use(express.json()); // For parsing JSON requests

app.use('/api/notes', notesRoutes);


app.get('/', (req, res) => {
  res.send("GET Request Called")
})

//app.use('/api/notes', notesRoutes);


export default app;
