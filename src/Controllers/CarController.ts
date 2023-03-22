import { Request, Response, Router } from 'express';
import CarService from '../Services/CarService';
import Controller from './Controller';
import HTTPStatusCode from '../utils/HTTPStatusCode';

class CarController extends Controller<CarService> {
  constructor() {
    const service = new CarService();
    super(service);
  }

  public async requestCarCreation(req: Request, res: Response) {
    const carFromReq = req.body;
    const createdCar = await this.service.createOne(carFromReq);
    return res.status(HTTPStatusCode.CREATED).json(createdCar);
  }

  public initRoutes(): Router {
    this.router.post('/', (req, res) => this.requestCarCreation(req, res));
    return this.router;
  }
}

export default CarController;