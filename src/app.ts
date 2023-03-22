import express from 'express';
import CarController from './Controllers/CarController';

const app = express();

app.use(express.json());

app.use('/cars', new CarController().initRoutes());

export default app;
