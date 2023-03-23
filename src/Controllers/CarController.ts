import { NextFunction, Request, Response, Router } from 'express';
import CarService from '../Services/CarService';
import Controller from './Controller';
import HTTPStatusCode from '../utils/HTTPStatusCode';

class CarController extends Controller<CarService> {
  constructor() {
    const service = new CarService();
    super(service);
  }

  private async requestCarCreation(req: Request, res: Response) {
    const carFromReq = req.body;
    const createdCar = await this.service.createOne(carFromReq);
    return res.status(HTTPStatusCode.CREATED).json(createdCar);
  }

  private async requestAll(_req: Request, res: Response) {
    const carList = await this.service.getAll();
    return res.status(HTTPStatusCode.OK).json(carList);
  }

  private async requestOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const car = await this.service.getById(id);
      return res.status(HTTPStatusCode.OK).json(car);
    } catch (error) {
      return next(error);
    }
  }

  private async requestToUpdateOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const patch = req.body;

    try {
      const updatedCar = await this.service.updateById(id, patch);
      return res.status(HTTPStatusCode.OK).json(updatedCar);
    } catch (error) {
      return next(error);
    }
  }

  public initRoutes(): Router {
    this.router.get('/', (req, res) => this.requestAll(req, res));
    this.router.get('/:id', (req, res, next) => this.requestOne(req, res, next));
    this.router.put('/:id', (req, res, next) => this.requestToUpdateOne(req, res, next));
    this.router.post('/', (req, res) => this.requestCarCreation(req, res));
    return this.router;
  }
}

export default CarController;