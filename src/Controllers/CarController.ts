import { NextFunction, Request, Response, Router } from 'express';
import CarService from '../Services/CarService';
import Controller from './Controller';
import HTTPStatusCode from '../utils/HTTPStatusCode';

class CarController extends Controller<CarService> {
  constructor(req: Request, res: Response, next: NextFunction) {
    const service = new CarService();
    super(service, req, res, next);
  }

  public async requestCarCreation() {
    const carFromReq = this.req.body;
    const createdCar = await this.service.createOne(carFromReq);
    return this.res.status(HTTPStatusCode.CREATED).json(createdCar);
  }

  initRoutes(): Router {
    throw new Error('Method not implemented.');
  }
}

export default CarController;