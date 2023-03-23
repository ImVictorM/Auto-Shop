import express from 'express';
import CarController from './Controllers/CarController';
import MotorcycleController from './Controllers/MotorcycleController';
import ErrorHandler from './Middlewares/ErrorHandler';

const app = express();

app.use(express.json());

app.use('/cars', new CarController().initRoutes());
app.use('/motorcycles', new MotorcycleController().initRoutes());

app.use(ErrorHandler.handle);

export default app;
