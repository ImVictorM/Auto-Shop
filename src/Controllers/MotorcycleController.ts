import { NextFunction, Request, Response, Router } from 'express';
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

  private async requestAll(req: Request, res: Response) {
    const motocycleList = await this.service.getAll();
    return res.status(HTTPStatusCode.OK).json(motocycleList);
  }

  private async requestOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const motorcycle = await this.service.getById(id);
      return res.status(HTTPStatusCode.OK).json(motorcycle);
    } catch (error) {
      return next(error);
    }
  }

  private async requestToUpdateOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const patch = req.body;

    try {
      const updatedMotorcycle = await this.service.updateById(id, patch);
      return res.status(HTTPStatusCode.OK).json(updatedMotorcycle);
    } catch (error) {
      return next(error);
    }
  }

  public initRoutes(): Router {
    this.router.get('/', (req, res) => this.requestAll(req, res));
    this.router.get('/:id', (req, res, next) => this.requestOne(req, res, next));
    this.router.put('/:id', (req, res, next) => this.requestToUpdateOne(req, res, next));
    this.router.post('/', (req, res) => this.requestMotorcycleCreation(req, res));
    return this.router;
  }
}

export default MotorcycleController;