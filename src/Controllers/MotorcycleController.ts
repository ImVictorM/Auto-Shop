import { Request, Response, Router } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import HTTPStatusCode from '../utils/HTTPStatusCode';
import Controller from './Controller';

class MotorcycleController extends Controller <MotorcycleService> {
  constructor() {
    const service = new MotorcycleService();
    super(service);
  }

  private async requestMotorcycleCreation(req: Request, res: Response) {
    const motoFromReq = req.body;
    const createdMotorcycle = await this.service.createOne(motoFromReq);
    return res.status(HTTPStatusCode.CREATED).json(createdMotorcycle);
  }

  public initRoutes(): Router {
    this.router.post('/', (req, res) => this.requestMotorcycleCreation(req, res));
    return this.router;
  }
}

export default MotorcycleController;