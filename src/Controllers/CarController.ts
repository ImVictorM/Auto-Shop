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

  public async requestAll(req: Request, res: Response) {
    const carList = await this.service.getAll();
    return res.status(HTTPStatusCode.OK).json(carList);
  }

  public initRoutes(): Router {
    this.router.get('/', (req, res) => this.requestAll(req, res));
    this.router.post('/', (req, res) => this.requestCarCreation(req, res));
    return this.router;
  }
}

export default CarController;