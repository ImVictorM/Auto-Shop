import { Router } from 'express';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
import Controller from './Controller';

class MotorcycleController extends Controller <IMotorcycle, Motorcycle> {
  constructor() {
    const service = new MotorcycleService();
    super(service);
  }

  public initRoutes(): Router {
    this.router.get('/', (req, res) => this.requestAll(req, res));
    this.router.get('/:id', (req, res, next) => this.requestOne(req, res, next));
    this.router.put('/:id', (req, res, next) => this.requestToUpdateOne(req, res, next));
    this.router.post('/', (req, res) => this.requestCreation(req, res));
    return this.router;
  }
}

export default MotorcycleController;